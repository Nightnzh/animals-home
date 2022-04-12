import { Box, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, ModalProps, Image, Text, VStack, useToast } from "@chakra-ui/react";
import { Animal } from "../types";
import favIcon from "../asset/fav.png"
import { ErrorImg } from "../page/pair/ErrorImg";
import { useSelector } from "react-redux";
import { StoreState } from "../redux/store";
import {  useFirestore } from "react-redux-firebase";
import {  icon1, icon3, iconFemale, iconMale } from "./Icons";

type MyModalProps = {
  animal: Animal,
  // onFavClick : (ani : Animal) => void,
  // onXXClick : React.MouseEventHandler
}

//FIXME: 用此ＦＣ時 porps的children不需要輸入才對
export const AnimalModal = ({
  // onFavClick , onXXClick , 
  animal, ...props }: MyModalProps & ModalProps) => {

  const auth = useSelector((state: StoreState) => state.firebase.auth)
  const fireStore = useFirestore()

  // const [isFav, setIsFav] = React.useState(false)
  const toast = useToast()

  const setFav = async () => {


    const isExisite = await fireStore.collection('fav').doc(auth.uid).collection('favorites').doc(animal.animal_id.toString()).get()


    if (isExisite.exists) {
      toast({
        status: "info",
        description: "已經在收藏囉～",
        position: "top",
        duration: 1000,
        
      })
      return
    }

    fireStore.collection("fav")
      .doc(auth.uid)
      .collection("favorites")
      .doc(animal.animal_id.toString())
      .set(animal)
      .then(() => {
        toast({
          status: "success",
          description: "收藏成功",
          position: "top",
        })
      })
      
  }

  const bo = ""
  const rounded = "20px"
  const fz24 = "24"
  const fz20 = "20"
  const fz16 = "16"
  const bgWhite = "white"

  return (
    <>
      <Modal {...props}  >
        <ModalOverlay />
        <ModalContent pt="60px">
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton
            color="white"
            _hover={{ bgColor: "#000" }}
            mt="60px"
            rounded="20px"
            backgroundColor="#000"
            onClick={props.onClose}
          />
          <ModalBody p="16px" d="flex" justifyContent="center" alignItems="center" bgColor="#f7f7f7">

            <Flex border={bo} h="auto" w={"60vw"} minW="300px" maxW={"1200px"} gap="16px" flexDirection={['column', 'column', 'column', 'row']}>
              <Box flex="1" d="flex" alignItems="center" justifyContent="center" >
                <Image
                  src={animal.album_file}
                  rounded={"40px"}
                  padding="16px"
                  // bgColor="red"
                  shadow={"2xl"}
                  border="1px solid rgba(0,0,0,0.2)"
                  fallback={<ErrorImg kind={animal.animal_kind} />}
                />
              </Box>

              <Flex flex="1" flexDirection={"column"} justifyContent={"center"} border={bo} gap={"16px"}>
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  m="8px"

                  borderBottom={"1px"}>
                  <Box>
                    <Text fontSize={fz20} fontWeight="bold">{animal.animal_id}</Text>
                    <Text fontSize={fz16}>{animal.animal_place}</Text>
                  </Box>
                  <Image src={favIcon} cursor="pointer" boxSize="20" onClick={() => setFav()} aria-label={"zz"} />
                </Flex >
                <Flex rounded={rounded} bgColor={bgWhite} px="12" py="4">
                  <Box>
                    <Text fontSize={fz24} fontWeight="bold">{animal.animal_subid}</Text>
                    <Text color={"#555"}>{animal.cDate}</Text>
                  </Box>
                </Flex>
                <Flex rounded={rounded} bgColor={bgWhite} justifyContent="space-between" w="100%" px="12" py="4">
                  <VStack >
                    {icon1}
                    <Text fontWeight={"500"}>求包養</Text>
                  </VStack>
                  <VStack >
                    {animal.animal_sex === "M" ? iconMale : iconFemale}
                    <Text fontWeight={"500"}>{animal.animal_sex === "M" ? "男生" : "女生"}</Text>
                  </VStack>
                  <VStack >
                    {icon3}
                    <Text fontWeight={"500"}>{animal.animal_colour}</Text>
                  </VStack>
                </Flex>
                <Box rounded={rounded} bgColor={bgWhite} px="12" py="4" >
                  <Text>{animal.shelter_tel}</Text><br />
                  <Text>{animal.shelter_address}</Text><br />
                  <Text>
                    {animal.animal_remark}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}




