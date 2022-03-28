import { Box, BoxProps, Button, ButtonGroup, ButtonProps, calc, Center, Flex, Grid, Select, styled, Switch, TagLabel, Text } from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import { useStore } from "react-redux"
import { Ctx } from "../../commen/context"
import { FilterCatButton, FilterDogButton, FilterFemaleButton, FilterMaleButton, FilterNoneButton, } from "../../component/Icons"
import { replaceAnimals, setFilter } from "../../redux/reducers"
import { useGetAnimalsDataQuery } from "../../service/animalsapi"
import { TestN } from "../../testcomponent/TestComponent"
import { Animal } from "../../types"
import AnimalViewer from "./AnimalViewer"


const kinds = ["狗", "貓", "all"]
const gender = ["公", "母", "all"]
const olds = ["幼齡", "成年", "all"]
const kind_colors = ["黃虎斑色", "白色", "虎斑白色", "黃色", "米色", "三花色", "黑黃色", "虎斑色", "黑色", "咖啡色", "灰色", "黃白色", "棕灰色", "棕白色", "棕色", "黑棕色", "咖啡棕色", "花色", "黑白色", "黑虎斑色", "灰白色", "棕黑色", "咖啡白色", "黑灰色", "花白色", "咖啡黑色", "灰黑色"]


//FIXME:取消左側區域的scrollbar
//TODO:右側區域只增加內左側shadow


export const Pair = () => {

  const store = useStore()
  // const handleFilter = (kind : string , gender : string , old : string , kind_colors : string) => {}

  const { data , isLoading , error , isError , isSuccess } = useGetAnimalsDataQuery()

  if(isSuccess){
    store.dispatch(replaceAnimals(data))
    // localStorage.setItem("animals-home",JSON.stringify(data))
  }


  //for testing 
  // const testData = localStorage.getItem("animals-home")
  // store.dispatch(replaceAnimals(JSON.parse(testData!!)))

  return (
    <Box pt="60px" >
      <Flex height="calc(100vh - 60px)" >
        <Box bgColor="#f9f9f9" display={{ base: "none", xl: "block" }} >
          <Center h="100%" >
            <Filter />
          </Center>
        </Box>
        <Box flex={7} boxShadow="inner" bgColor="#f7f7f7">
          {
            <AnimalViewer />
          }
        </Box>
      </Flex>
    </Box>
  )
}




const Filter = () => {

  const store = useStore()

  const [filterKind, setFilterKind] = useState("none")
  const [filterGender, setFilterGender] = useState("none")
  const [filterAge, setFilterAge] = useState("none")
  const [filterKindColor, setFilterKindColor] = useState("none")

  const [isNear, setIsNear] = useState(false)
  const [isSoundEnable, setIsSoundEnable] = useState(false)


  //kind
  const handleKindFilter = (event: React.MouseEvent) => {
    event.preventDefault()
    setFilterKind((event.currentTarget as HTMLInputElement).value)
  }
  const isKindSelected = (value: string) => {
    return value === filterKind
  }

  //Gender
  const handleGenderFilter = (event: React.MouseEvent) => {
    event.preventDefault()
    setFilterGender((event.currentTarget as HTMLInputElement).value)
  }
  const isGenderSelected = (value: string) => {
    return value === filterGender
  }

  //Old
  const handleOldFilter = (event: React.MouseEvent) => {
    event.preventDefault()
    setFilterAge((event.currentTarget as HTMLInputElement).value)
  }
  const isOldSelected = (value: string) => {
    return value === filterAge
  }


  //kindColor
  const handleKindColorFilter = (event: React.MouseEvent) => {
    event.preventDefault()
    setFilterKindColor((event.currentTarget as HTMLInputElement).value)
  }
  const isKindColorSelected = (value: string) => {
    return value === filterKindColor
  }

  //handle All FilterData

  const handleAllFilter = (event: React.MouseEvent) => {
    event.preventDefault()


    const filter = {
      kind: filterKind,
      age: filterAge,
      gender: filterGender,
      kindColor: filterKindColor,
      isNear: isNear,
      isSoundEnable: isSoundEnable,
    }

    console.log(filter)
    store.dispatch(setFilter(filter))
  }


  return (
    <Box px="10" maxH="94vh" overflowY="scroll"  >
      <Text pl="8px" fontWeight="bold">我想找尋</Text>
      <ButtonGroup>
        <FilterCatButton value="貓" isSelected={isKindSelected("貓")} onClick={handleKindFilter} />
        <FilterDogButton value="狗" isSelected={isKindSelected("狗")} onClick={handleKindFilter} />
        <FilterNoneButton value="none" isSelected={isKindSelected("none")} onClick={handleKindFilter} />
      </ButtonGroup>

      <Text pl="8px" fontWeight="bold">性別</Text>
      <ButtonGroup>
        <FilterMaleButton value="M" isSelected={isGenderSelected("M")} onClick={handleGenderFilter} />
        <FilterFemaleButton value="F" isSelected={isGenderSelected("F")} onClick={handleGenderFilter} />
        <FilterNoneButton value="none" isSelected={isGenderSelected("none")} onClick={handleGenderFilter} />
      </ButtonGroup>

      <Text pl="8px" fontWeight="bold">年齡</Text>
      <ButtonGroup >
        <TextBtn value="CHILD" text={"幼齡"} isSelected={isOldSelected("CHILD")} onClick={handleOldFilter} />
        <TextBtn value="ADULT" text={"成年"} isSelected={isOldSelected("ADULT")} onClick={handleOldFilter} />
        <TextBtn value="none" text={"不拘"} isSelected={isOldSelected("none")} onClick={handleOldFilter} />
      </ButtonGroup>

      <Text pl="8px" fontWeight="bold">顏色</Text>
      <ButtonGroup display="flex" flexWrap="wrap">
        <Grid templateColumns='repeat(3, 1fr)'>
          {kind_colors.sort().map((value, index) => (<TextBtn key={index} value={value} text={value} isSelected={isKindColorSelected(value)} onClick={handleKindColorFilter} />))}
          <TextBtn value="none" text={"不拘"} isSelected={isKindColorSelected("none")} onClick={handleKindColorFilter} />
        </Grid>

      </ButtonGroup>

      <Box>
        <Flex justifyContent="space-between" alignItems="center" m="8px" >
          <Text fontWeight="bold">搜尋附近</Text>
          <Switch defaultChecked={false} onChange={(event) => { console.log("TODO:搜尋附近"); setIsNear(event.currentTarget.checked) }} />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" m="8px" >
          <Text fontWeight="bold">互動音效</Text>
          <Switch defaultChecked={false} onChange={(event) => { console.log("TODO:互動音效"); setIsSoundEnable(event.currentTarget.checked) }} />
        </Flex>
      </Box>

      <Button bgColor="#000" w="95%" mx="8px" mt="16px" rounded="100" onClick={handleAllFilter} ><Text color="#fff">套用</Text></Button>

    </Box>
  )
}


interface TextBtnProps {
  text: string,
  isSelected: boolean,
}

const TextBtn = ({ value, text, isSelected, onClick }: TextBtnProps & ButtonProps) => {

  const ctx = useContext(Ctx)

  const textColor = isSelected ? ctx.selectedColor : ctx.unselectedColor
  const bgColor = isSelected ? ctx.bgSelectedColor : ctx.bgDefaultColor

  return (
    <Button value={value} bgColor={bgColor} w="20" h="10" m="8px" _hover={{ bgColor: bgColor }}
      boxShadow="md"
      rounded="15"
      color={textColor}
      fontWeight="400"
      onClick={onClick}
    >
      {text}
    </Button>
  )
}


interface AnimalLargeViewerProps {
  animal: Animal
}

