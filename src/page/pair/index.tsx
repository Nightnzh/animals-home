import { Box, BoxProps, Button, ButtonGroup, ButtonProps, calc, Center, Flex, Grid, HStack, Select, styled, Switch, TagLabel, Text, VStack } from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import { useStore } from "react-redux"
import { Ctx } from "../../commen/context"
import { FilterCatButton, FilterDogButton, FilterFemaleButton, FilterMaleButton, FilterNoneButton, } from "../../component/Icons"
import { replaceAnimals, setFilter } from "../../redux/aniReducers"
import { useGetAnimalsDataQuery } from "../../service/animalsapi"
import { TestN } from "../../testcomponent/TestComponent"
import { Animal } from "../../types"
import AnimalViewer from "./AnimalViewer"
import { Filter } from "./Filter"


const kinds = ["狗", "貓", "all"]
const gender = ["公", "母", "all"]
const olds = ["幼齡", "成年", "all"]


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






