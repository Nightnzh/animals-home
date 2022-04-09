import { Box, Button, Center, CloseButton, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, Flex, IconButton, useBreakpoint, useDisclosure, useMediaQuery } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useStore } from "react-redux"
import { replaceAnimals } from "../../redux/animal"
import { useGetAnimalsDataQuery } from "../../service/animalsapi"
import AnimalViewer from "./AnimalViewer"
import { Filter, FilterSection } from "./Filter"






export const Pair = () => {

  const store = useStore()

  const { data, isLoading, error, isError, isFetching, isSuccess, refetch } = useGetAnimalsDataQuery()


  const [isSmallThan700] = useMediaQuery("(max-width: 700px)")

  // if(isSuccess){
  //   store.dispatch(replaceAnimals(data))
  //   // localStorage.setItem("animals-home",JSON.stringify(data))
  // }

  useEffect(() => {
    if (isSuccess) {
      store.dispatch(replaceAnimals(data))
      // localStorage.setItem("animals-home",JSON.stringify(data))
    }
  })


  //for testing 
  // const testData = localStorage.getItem("animals-home")
  // store.dispatch(replaceAnimals(JSON.parse(testData!!)))

  return (
    <Box pt="60px"  >
      <Flex height="calc(100vh - 60px)" >
        <Box bgColor="#f9f9f9"  >
          <Center h="100%" >
            { isSmallThan700 ? <DrawerFilter/> :
            <FilterSection />}
          </Center>
        </Box>
        <Box flex={1} boxShadow="inner" bgColor="#f7f7f7" position={"relative"}>
          {isLoading || isFetching ? <Center h="100%">Loading</Center> : ""}
          {isSuccess ? <AnimalViewer /> : ""}
          {/* <Button onClick={refetch} position="absolute" right={"50px"} top="50px" >refetch data</Button> */}
        </Box>
      </Flex>
    </Box>
  )
}





const DrawerFilter = () => {

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure(); //use for modal drawer


  return (
    <>
      <IconButton onClick={onToggle} aria-label={"HamburgerIcon"} position={"fixed"} bottom={"20px"} right={"20px"} zIndex="200" rounded={"100px"} boxSize="50px" colorScheme={"blue"}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          width="30" height="30"
          viewBox="0 0 30 30"
        ><path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"
          fill="currentColor" />
        </svg>
      </IconButton>
      <Drawer isOpen={isOpen} onClose={onClose}  placement='bottom' size={"full"} >
        
        <DrawerContent >
        <DrawerCloseButton />
          <Center>

          <Filter controlClose={onClose}/>
          </Center>
        </DrawerContent>
      </Drawer>
    </>
  )
}