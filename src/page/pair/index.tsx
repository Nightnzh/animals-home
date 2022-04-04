import { Box, Button, Center, Flex } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useStore } from "react-redux"
import { replaceAnimals } from "../../redux/animal"
import { useGetAnimalsDataQuery } from "../../service/animalsapi"
import AnimalViewer from "./AnimalViewer"
import { Filter } from "./Filter"


// const kinds = ["狗", "貓", "all"]
// const gender = ["公", "母", "all"]
// const olds = ["幼齡", "成年", "all"]


//FIXME:取消左側區域的scrollbar
//TODO:右側區域只增加內左側shadow


export const Pair = () => {

  const store = useStore()

  const { data , isLoading , error , isError , isFetching ,isSuccess , refetch} = useGetAnimalsDataQuery()

  if(isSuccess){
    store.dispatch(replaceAnimals(data))
    // localStorage.setItem("animals-home",JSON.stringify(data))
  }

  

  //for testing 
  // const testData = localStorage.getItem("animals-home")
  // store.dispatch(replaceAnimals(JSON.parse(testData!!)))

  return (
    <Box pt="60px"  >
      <Flex height="calc(100vh - 60px)" >
        <Box bgColor="#f9f9f9" display={{ base: "none", xl: "block" }} >
          <Center h="100%" >
            <Filter />
          </Center>
        </Box>
        <Box    flex={1}  boxShadow="inner" bgColor="#f7f7f7" position={"relative"}>
          {isLoading || isFetching ? <Center h="100%">Loading</Center> : ""}
          {isSuccess ?  <AnimalViewer /> : ""}
          <Button onClick={refetch} position="absolute" right={"50px"} top="50px" >refetch data</Button>
        </Box>
      </Flex>
    </Box>
  )
}






function calculateDaysBetweenDates(date1: Date, date2: Date) {
  const oneDay = 1000 * 60 * 60 * 24;
  const differenceMs = Math.abs(date1.getTime() - date2.getTime());
  return Math.round(differenceMs / oneDay);
}
