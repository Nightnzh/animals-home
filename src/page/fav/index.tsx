import { Box, Center, Container, VStack, Image, Flex, Text, Wrap, useToast, useDisclosure } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { isLoaded, useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { StoreState } from "../../redux/store";
import { Animal } from "../../types";

import caterrimg from "../../asset/caterror.png"
import dogerrrimg from "../../asset/dogerror.png"
import { fmicon, micon, xxicon } from "../../component/Icons";
import { AnimalModal } from "../../component/AnimalInfoModal";


export const Fav = () => {

  const auth = useSelector((state: StoreState) => state.firebase.auth)


  if (auth.isEmpty) {

    return (
      <Center fontSize={"2xl"} h="calc(100vh - 60px)">
        請登入
      </Center>
    )
  }

  return (
    <Box

      mt="60px"
      h="calc(100vh - 60px)"
      bgColor={"#f7f7f7"}
      py="40px"
      overflowY={"scroll"}
    >
      <Container>
        <Text textAlign={["start", "center"]} fontSize={"2xl"} pb={"32px"}>用戶收藏</Text>
        {
          <FavAnis />
        }
      </Container>
    </Box>
  )
}


const favs = 'favs'

const FavAnis = () => {

  const authId = useSelector((state: StoreState) => state.firebase.auth.uid)

  useFirestoreConnect([
    {
      collection: `fav/${authId}/favorites`,
      storeAs: favs,
    },

  ])


  const aniFavData = useSelector((state: StoreState) => state.firestore.ordered.favs)

  // console.log(aniFavData);

  return (
    <Flex
      flexWrap={"wrap"}
      gap={8}
      // alignItems="center"
      justifyContent="center"
    >

      { 
        isLoaded(aniFavData) && aniFavData.length === 0 ? <Center fontSize={"2xl"}>目前沒有收藏</Center> : <></>}
      {
        isLoaded(aniFavData) ?
          aniFavData.map((ani) => {
            const aniData = JSON.parse(JSON.stringify(ani))
            return <FavAniCard key={ani.id.toString()} ani={aniData} />
          }) : ""
      }
    </Flex>
  )
}


interface FavAniCardProps {
  ani: Animal
}

const FavAniCard = ({ ani }: FavAniCardProps) => {

  const errimg = ani.animal_kind === "狗" ? dogerrrimg : caterrimg
  const sexicon = ani.animal_sex === "M" ? micon : fmicon

  const firestore = useFirestore()
  const authID = useSelector((state: StoreState) => state.firebase.auth.uid)

  const { isOpen, onOpen ,onClose } = useDisclosure()

  const toast = useToast()

  const handleDelete = () => {

    firestore.collection("fav")
      .doc(authID)
      .collection("favorites")
      .doc(ani.animal_id.toString())
      .delete()
      .then(() => {
        // throw "test"
        toast({
          title: "Delete Success",
          status: "success",
          isClosable: true
        })
      }
      ).catch(e => {
        console.log("🚀 ~ file: index.tsx ~ line 119 ~ handleDelete ~ e", e)

        toast({
          title: "Error",
          status: "error",
          isClosable: true
        })
      })

  }

  return (
    <>
      <VStack
        
        rounded={"30"}
        p={"16px"}
        gap={2}
        bgColor="#fff"
        shadow={"2xl"}
        cursor="pointer"
      // maxW="60"
      >
        <Wrap position="relative" >
          <Image src={ani.album_file} onClick={onOpen}  w={["100%","400px"]} h="400px"
            objectFit={"cover"}
            fallback={<Image src={errimg} w={["100%","400px"]} h="400px" objectFit={"contain"} rounded={"20"} shadow="2xl" border={"1px solid rgba(0,0,0,0.3)"} />}
            rounded={"20"} shadow="2xl" border={"1px solid rgba(0,0,0,0.3)"} >
          </Image>
          <Box position={"absolute"} top="0px" right={"0px"} onClick={handleDelete} >
            {xxicon}
          </Box>
        </Wrap>

        <Flex justifyContent="space-between" w="100%" alignItems={"center"} >
          <Text fontWeight={"bold"} fontSize="20px">{ani.animal_id}</Text>
          {sexicon}
        </Flex>
        <Text color={"#555"} w="100%" mb={"16px"} noOfLines={1} >{ani.animal_place}</Text>
      </VStack>
      <AnimalModal animal={ani} children={undefined} isOpen={isOpen} onClose={onClose} size={"full"} />
    </>
  )
}


