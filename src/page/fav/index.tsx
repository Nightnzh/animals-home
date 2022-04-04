import { Box, Center, Container, VStack, Image, Flex, Text, Icon, Wrap, Alert, useToast } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { isLoaded, useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { StoreState } from "../../redux/store";
import { Animal } from "../../types";

import caterrimg from "../../asset/caterror.png"
import dogerrrimg from "../../asset/dogerror.png"
import { iconFemale, iconMale } from "../../component/AnimalInfoModal";
import { stringify } from "querystring";


export const Fav = () => {

  const auth = useSelector((state: StoreState) => state.firebase.auth)


  if (auth.isEmpty) {

    return (
      <Center h="calc(100vh - 60px)">
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
      // collection : `favorites`
      storeAs: favs,

    },

  ])


  const aniFavData = useSelector((state: StoreState) => state.firestore.ordered.favs)

  console.log(aniFavData);

  return (
    <Flex
      flexWrap={"wrap"}
      gap={8}
      // alignItems="center"
      justifyContent="center"
    >
      {/* {JSON.stringify(aniFavData)} */}

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


  const toast = useToast()

  const handleDelete = () => {

    firestore.collection("fav")
      .doc(authID)
      .collection("favorites")
      .doc(ani.animal_id.toString())
      .delete()
      .then(() => {
        throw "test"
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
        <Image src={ani.album_file} w="40" h="40"
          objectFit={"cover"}
          fallback={<Image src={errimg} w="40" h="40" objectFit={"contain"} rounded={"20"} shadow="2xl" border={"1px solid rgba(0,0,0,0.3)"} />}
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
      <Text color={"#555"} fontSize={"16px"} mb={"16px"} noOfLines={1} maxW="40">{ani.shelter_address}</Text>
    </VStack>

  )
}


const micon = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.0545 5.18127L15.8585 3.3772L15.9121 4.69112C15.9203 4.91354 16.1057 5.08241 16.3281 5.07418L17.4649 5.02475C17.6873 5.01651 17.8562 4.83116 17.848 4.60874L17.6791 0.535162C17.6708 0.312742 17.4855 0.143868 17.2631 0.152105L13.1895 0.32098C12.9671 0.329218 12.7982 0.514568 12.8064 0.736988L12.8559 1.8738C12.8641 2.09622 13.0494 2.2651 13.2719 2.25686L14.5611 2.20331L12.8188 3.9456C9.73374 1.47015 5.21532 1.66374 2.35269 4.52636C-0.719996 7.59905 -0.719998 12.5747 2.35269 15.6474C5.42538 18.7201 10.4051 18.7159 13.4737 15.6474C16.3363 12.7847 16.5299 8.26632 14.0545 5.18127ZM4.00025 13.9998C1.84195 11.8415 1.84195 8.33222 4.00025 6.17392C6.15855 4.01562 9.66784 4.01562 11.8261 6.17392C13.9844 8.33222 13.9844 11.8415 11.8261 13.9998C9.66784 16.1581 6.15855 16.1581 4.00025 13.9998Z" fill="#70D4F4" />
</svg>

const fmicon = <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.8504 8.09536C15.8504 3.75731 12.3381 0.244995 8.00002 0.244995C3.66197 0.244995 0.149658 3.75731 0.149658 8.09536C0.149658 12.1601 3.24328 15.5038 7.20336 15.905V17.8705H5.55187C5.27856 17.8705 5.05759 18.0915 5.05759 18.3648V19.1208C5.05759 19.3941 5.27856 19.615 5.55187 19.615H7.20336V21.2142C7.20336 21.5166 7.42433 21.755 7.69764 21.755H8.4536C8.72691 21.755 8.94788 21.5108 8.94788 21.2142V19.615H10.5994C10.8727 19.615 11.0936 19.3941 11.0936 19.1208V18.3648C11.0936 18.0915 10.8727 17.8705 10.5994 17.8705H8.94788L8.94788 15.8818C12.8324 15.4166 15.8504 12.1078 15.8504 8.09536ZM2.47569 8.09536C2.47569 5.04826 4.95292 2.57103 8.00002 2.57103C11.0471 2.57103 13.5244 5.04826 13.5244 8.09536C13.5244 11.1425 11.0471 13.6197 8.00002 13.6197C4.95292 13.6197 2.47569 11.1425 2.47569 8.09536Z" fill="#FDAAA2" />
</svg>


const xxicon = <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_d_16_849)">
    <path d="M7 30C7 16.1929 18.1929 5 32 5C45.8071 5 57 16.1929 57 30C57 43.8071 45.8071 55 32 55C18.1929 55 7 43.8071 7 30Z" fill="white" />
    <path d="M33.6446 29.999L38.66 24.9953C38.8796 24.7756 39.003 24.4778 39.003 24.1671C39.003 23.8565 38.8796 23.5587 38.66 23.339C38.4404 23.1194 38.1425 22.996 37.8319 22.996C37.5213 22.996 37.2234 23.1194 37.0037 23.339L32 28.3544L26.9963 23.339C26.7766 23.1194 26.4787 22.996 26.1681 22.996C25.8575 22.996 25.5596 23.1194 25.34 23.339C25.1204 23.5587 24.997 23.8565 24.997 24.1671C24.997 24.4778 25.1204 24.7756 25.34 24.9953L30.3554 29.999L25.34 35.0028C25.2307 35.1112 25.1439 35.2402 25.0847 35.3823C25.0255 35.5244 24.995 35.6769 24.995 35.8309C24.995 35.9848 25.0255 36.1373 25.0847 36.2794C25.1439 36.4216 25.2307 36.5506 25.34 36.659C25.4484 36.7683 25.5774 36.8551 25.7196 36.9143C25.8617 36.9735 26.0142 37.004 26.1681 37.004C26.3221 37.004 26.4746 36.9735 26.6167 36.9143C26.7588 36.8551 26.8878 36.7683 26.9963 36.659L32 31.6436L37.0037 36.659C37.1122 36.7683 37.2412 36.8551 37.3833 36.9143C37.5254 36.9735 37.6779 37.004 37.8319 37.004C37.9858 37.004 38.1383 36.9735 38.2804 36.9143C38.4226 36.8551 38.5516 36.7683 38.66 36.659C38.7693 36.5506 38.8561 36.4216 38.9153 36.2794C38.9745 36.1373 39.005 35.9848 39.005 35.8309C39.005 35.6769 38.9745 35.5244 38.9153 35.3823C38.8561 35.2402 38.7693 35.1112 38.66 35.0028L33.6446 29.999Z" fill="#262626" />
  </g>
  <defs>
    <filter id="filter0_d_16_849" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix" />
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
      <feOffset dy="2" />
      <feGaussianBlur stdDeviation="3.5" />
      <feComposite in2="hardAlpha" operator="out" />
      <feColorMatrix type="matrix" values="0 0 0 0 0.0392157 0 0 0 0 0.0392157 0 0 0 0 0.0392157 0 0 0 0.07 0" />
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_16_849" />
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_16_849" result="shape" />
    </filter>
  </defs>
</svg>
