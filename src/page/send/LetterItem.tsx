import { useToast, Box, Center, Spinner, Flex, Spacer, Button, Image, Text, useDisclosure } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { useFirestore } from "react-redux-firebase"
import { AnimalModal } from "../../component/AnimalInfoModal"
import { maleSvg, femaleSvg } from "../../component/Icons"
import { SendLetter } from "../../redux/firebase"
import { StoreState } from "../../redux/store"

interface LetterItemProps {
  sendLetter: SendLetter,
  docId: string,
}

export const LetterItem = ({ sendLetter, docId }: LetterItemProps) => {

  //此參數用於判斷 item 是否為自己發的！
  const authId = useSelector((state: StoreState) => state.firebase.auth.uid)

  const isMyLetter = useSelector((state: StoreState) => state.firebase.auth.uid === sendLetter.senderId)

  const toast = useToast()

  const firestore = useFirestore()

  const delLetter = () => {
    // sendLetter.delLetter() //FIXME: 這推薦好！但必須掛在object上！
    firestore.collection("sendLetter").doc(docId).delete().then(() => {
      toast({
        status: "success",
        description: "刪除成功",
        position: "top"
      })
    }).catch(() => {
      toast({
        status: "error",
        description: "刪除失敗",
        position: "top"
      })
    })
  }

  const { onToggle, isOpen , onOpen ,onClose} = useDisclosure()


  return (
    <>
      <Box gap="16px" pb={"16px"} flex={1} minW="200px" maxW={"300px"} bg="#FFF" rounded={"20px"} boxShadow="xl" cursor={"pointer"} onClick={onOpen} >
        <Image mb="16px" src={sendLetter.ani.album_file} maxH="300px" objectFit={"cover"} fallback={<Center w="100%" h="200px" ><Spinner /></Center>} rounded="20px" w="100%" />
        <Box gap={"8px"} px="8px">
          <Text>{`${sendLetter.ani.animal_age === "CHILD" ? "幼齡" : "成年"}`}</Text>
          <Flex>
            <Text>性別：</Text>
            <Spacer></Spacer>
            {sendLetter.ani.animal_sex === "M" ? maleSvg : femaleSvg}
          </Flex>
          <Flex>
            <Text>建立時間:</Text>
            <Spacer />
            <Text>{sendLetter.ani.cDate}</Text>
          </Flex>
          <Button isDisabled={!isMyLetter} onClick={() => { delLetter() }} colorScheme={"pink"} mt="8px" w="100%" >刪除</Button>
        </Box>
      </Box>
      <AnimalModal animal={sendLetter.ani} children={undefined} isOpen={isOpen} onClose={onClose} size={"full"}/>
    </>
  )

}