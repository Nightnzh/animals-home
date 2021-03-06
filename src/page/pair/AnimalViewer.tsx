
import { Text, Image, Box, IconButton, Flex, useDisclosure, Container, } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps, useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import { Animal } from "../../types";

// import loadingGif from "../../asset/loading__.gif"
import infoIcon from "../../asset/ii.png"
import favIcon from "../../asset/fav.png"
import xxIcon from "../../asset/xx.png"
import maleIcon from "../../asset/male.png"
import feMateIcon from "../../asset/female.png"
// import { motion } from 'framer-motion'

import { ErrorImg } from "./ErrorImg";
import { AnimalModal } from "../../component/AnimalInfoModal";
import { AnimalSmallCard } from "./AmimalSmallCard";
import { useFirestore } from "react-redux-firebase";




//TODO: using this to add animate and event
// const Motion = motion(Box)


// using react-redux connect!
// typescript also need more detail!!!


const mapStateToProps = (state: StoreState) => {

  const filter = state.animals.filter
  // console.log(state.animals.animalsData.map(value => value.animal_age).sort());

  // filter fun
  const filterData = () => {

    let temp = state.animals.animalsData
    if (filter.kind !== "none") {
      temp = temp.filter(value => filter.kind === value.animal_kind)
    }

    if (filter.gender !== "none")
      temp = temp.filter(value => filter.gender === value.animal_sex)

    if (filter.age !== "none" && filter.age === "ADULT") {
      temp = temp.filter(value => value.animal_age !== "CHILD")
    }

    if (filter.age !== "none" && filter.age === "CHILD") {
      temp = temp.filter(value => value.animal_age === "CHILD")
    }

    if (filter.kindColor !== "none") {
      temp = temp.filter(value => filter.kindColor === value.animal_colour)
    }

    return temp
  }

  const getRandom = (arr: Animal[], n: number) => {

    let result = new Array<Animal>(n),
      len = arr.length,
      taken = new Array(len);
    try {
      if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
      }
      // console.log(result);
    } catch (e) {
      console.log(e);
    }
    return result;
  }

  const data = filterData()

  return {
    data: data,
    noFilterRandomDatas: getRandom(state.animals.animalsData, 3)
  }
}

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>


const PairAnimalViewer = (props: PropsFromRedux) => {

  const [ani, setAni] = useState<Animal | undefined>(undefined)
  const randomFn = () => {
    setAni(props.data[Math.floor(Math.random() * props.data.length)])
  }

  const { isOpen, onOpen, onClose } = useDisclosure() // controller modal

  useEffect(() => {

    setAni(props.data[Math.floor(Math.random() * props.data.length)])

  }, [props.data]) //??? props state ??? ani === undefined ?????? random


  const authId = useSelector((state: StoreState) => state.firebase.auth.uid)

  const firestore = useFirestore()



  const addFavAni = (ani: Animal) => {


    if (authId === undefined) {
      alert("auth is undefined")
      return
    }

    firestore
      .collection('fav')
      .doc(authId)
      .collection('favorites')
      .doc(ani.animal_id.toString())
      .set(ani)
      .catch(e => {
        console.log(e);
        alert(e)
      }).finally(() => {
        randomFn()
      })
  }


  return (
    <>
      <Container
        // border="1px"
        // h="100%"
        // flexDirection="column"
        
        // alignItems="center"
        // justifyContent={"space-around"}
        >
        {/* {props.singleAnimal === undefined ? <Loading/> : props.singleAnimal.animal_colour} */}
        {/* <Text>{randomNum}</Text> */}
        <AnimalCard

          onXXClick={randomFn}
          onFavClick={addFavAni}
          onInfoClick={onOpen}
          animal={ani!!} />
        <Flex  gap={"16px"} flexWrap="wrap" justifyContent={"center"} >
          {
            props.noFilterRandomDatas.length !== 0 && props.noFilterRandomDatas !== undefined ?
              props.noFilterRandomDatas.map(value => {
                return (
                  <AnimalSmallCard key={value.animal_id} animal={value}  />
                )
              })
              : <></>
          }
          {/* <Button onClick={randomFn}>Random</Button> */}
        </Flex>
      </Container>


      {ani !== undefined ?
        <AnimalModal
          size="full"
          animal={ani}
          isOpen={isOpen}
          onClose={onClose}
          children={undefined}
        /> : <></>}
    </>
  )
}


interface AnimalCardProps {
  animal: Animal,
  onXXClick: React.MouseEventHandler,
  onFavClick: (ani: Animal) => void,
  onInfoClick: React.MouseEventHandler
}


// FIXME: ???????????????
const AnimalCard = ({ animal, onXXClick, onFavClick, onInfoClick }: AnimalCardProps) => {


  const width = ["300px","400px","500px"]
  const height = "300px"
  const border = ""
  const rounded = "40px"

  // console.log(animal);

  if (animal === undefined) {
    return (
      <Box flex={7} border={border} boxSizing="border-box" width="100%" height={"70vh"} position="relative"  >
        <Box border={border} boxShadow="2xl" w={width} h={height} rounded={rounded} position="absolute" top="50%" left="50%" transform="translate(-50%,-50%) rotate(20deg)" zIndex="2" bgColor="#FFF" />
        <Box border={border} boxShadow="2xl" w={width} h={height} rounded={rounded} position="absolute" top="50%" left="50%" transform="translate(-50%,-50%) rotate(10deg)" zIndex="1" bgColor="#FFF" />
        <Text
          align="center"
          color="#fda59e"
          zIndex={"5"}
          position="absolute"
          top="50%" left="50%"
          transform="translate(-50%,-50%)"
          fontWeight="800" >
          ????????????<br />
          ???????????????????????????????????????<br />
          ??????????????????????????????
        </Text>
      </Box>
    )
  }

  return (
    <Box flex={7}  border={border} boxSizing="border-box" height={"70vh"}   position="relative" >
      <Box border={border} boxShadow="2xl" w={width} h={height} rounded={rounded} position="absolute" top="50%" left="50%" transform="translate(-50%,-50%) rotate(20deg)" zIndex="2" bgColor="#FFF" />
      <Box border={border} boxShadow="2xl" w={width} h={height} rounded={rounded} position="absolute" top="50%" left="50%" transform="translate(-50%,-50%) rotate(10deg)" zIndex="1" bgColor="#FFF" />
      <Box border="1px solid rgba(0,0,0,0.3)" boxShadow="2xl" w={width}  minH="100px" rounded={rounded} position="absolute" top="50%" left="50%" transform="translate(-50%,-50%) rotate(-5deg)" zIndex="3" bgColor="#FFF" p="12px">
        {/* ImageAbout */}
        <Box>
          <Image src={animal?.album_file}
            rounded={rounded} w="100%"
            alt={animal.animal_id.toString()}
            maxH="400px"
            objectFit={"cover"}
            objectPosition={"center"}
            fallback={<ErrorImg kind={animal.animal_kind} />}
            onError={(e) => console.log(e)}
            // loading="eager"
            
          />
          <IconButton aria-label={""}
            position="absolute"
            right="24px" top="24px"
            transform="rotate(5deg)" bgColor="rgba(0,0,0,0)" _hover={{ bgColor: "rgba(0,0,0,0)" }}
            onClick={onInfoClick}
          >
            <Image src={infoIcon} pointerEvents="painted" boxSize="40px" />
          </IconButton>
          <Flex position="absolute" justifyContent="space-between" left="20px" right="30px" bottom="30px" transform="rotate(5deg)" alignItems="center"   >
            <IconButton aria-label={""} onClick={onXXClick} bgColor="rgba(0,0,0,0)" _hover={{ bgColor: "rgba(0,0,0,0)" }} minW="50px" >
              <Image src={xxIcon} pointerEvents="painted" boxSize="50px" />
            </IconButton>
            <Flex color={"#FFF"} letterSpacing="0.8px" fontWeight="bold" flexDirection="column" backdropFilter='auto' backdropBlur='4px' p="8px" rounded="40px" mx="8px">
              <Text align="center" textShadow="dark-lg">{animal.animal_id}
                <Image src={animal.animal_sex === "M" ? maleIcon : feMateIcon} boxSize="20px" ml="8px" d="inline" />
              </Text>
              <Text
                align="center"
                textShadow="dark-lg"
                noOfLines={1}  >{animal.shelter_name}
              </Text>
            </Flex>
            <IconButton aria-label={""}
              onClick={() => { onFavClick(animal) }}
              bgColor="rgba(0,0,0,0)"
              _hover={{ bgColor: "rgba(0,0,0,0)" }}
              boxSize="50px" minW="50px">
              <Image src={favIcon} pointerEvents="painted" boxSize="50px" />
            </IconButton>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}


export default connector(PairAnimalViewer)