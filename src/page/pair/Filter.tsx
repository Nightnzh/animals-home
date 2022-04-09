import { Box, Grid, Flex, Switch, Button, ButtonProps, Text, IconButton, Icon, useDisclosure, Show, VisuallyHidden, Fade } from "@chakra-ui/react"
import { useState, useContext } from "react"
import { useStore } from "react-redux"
import { Ctx } from "../../commen/context"
import { FilterCatButton, FilterDogButton, FilterNoneButton, FilterMaleButton, FilterFemaleButton } from "../../component/Icons"
import { setFilter } from "../../redux/animal"


export const kind_colors = ["黃虎斑色", "白色", "虎斑白色", "黃色", "米色", "三花色", "黑黃色", "虎斑色", "黑色", "咖啡色", "灰色", "黃白色", "棕灰色", "棕白色", "棕色", "黑棕色", "咖啡棕色", "花色", "黑白色", "黑虎斑色", "灰白色", "棕黑色", "咖啡白色", "黑灰色", "花白色", "咖啡黑色", "灰黑色"]


export const FilterSection = () => {

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  return (
    <Box pt="60px">
      <IconButton onClick={onToggle} aria-label={"HamburgerIcon"} position={"fixed"} bottom={"20px"} right={"20px"} zIndex="200" rounded={"100px"} boxSize="50px" colorScheme={"blue"}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          width="30" height="30"
          viewBox="0 0 30 30"
        ><path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"
          fill="currentColor" />
        </svg>
      </IconButton>
      <Fade in={isOpen} hidden={!isOpen} >
        <Filter/>
        
      </Fade>

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
 
interface FilterProps {
  controlClose? : () => void
}

export const Filter = ({ controlClose } : FilterProps) => {

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
    //控制關閉
    if(controlClose !== undefined){
      controlClose()
    }
  }

  return (
    <Box px="10" maxH="94vh"  pt="32px" overflowY={"auto"} >
      <Text pl="8px" fontWeight="bold">我想找尋</Text>
      <Box>
        <FilterCatButton value="貓" isSelected={isKindSelected("貓")} onClick={handleKindFilter} />
        <FilterDogButton value="狗" isSelected={isKindSelected("狗")} onClick={handleKindFilter} />
        <FilterNoneButton value="none" isSelected={isKindSelected("none")} onClick={handleKindFilter} />
      </Box>

      <Text pl="8px" fontWeight="bold">性別</Text>
      <Box>
        <FilterMaleButton value="M" isSelected={isGenderSelected("M")} onClick={handleGenderFilter} />
        <FilterFemaleButton value="F" isSelected={isGenderSelected("F")} onClick={handleGenderFilter} />
        <FilterNoneButton value="none" isSelected={isGenderSelected("none")} onClick={handleGenderFilter} />
      </Box>

      <Text pl="8px" fontWeight="bold">年齡</Text>
      <Box >
        <TextBtn value="CHILD" text={"幼齡"} isSelected={isOldSelected("CHILD")} onClick={handleOldFilter} />
        <TextBtn value="ADULT" text={"成年"} isSelected={isOldSelected("ADULT")} onClick={handleOldFilter} />
        <TextBtn value="none" text={"不拘"} isSelected={isOldSelected("none")} onClick={handleOldFilter} />
      </Box>

      <Text pl="8px" fontWeight="bold">顏色</Text>
      <Box display="flex" flexWrap="wrap">
        <Grid templateColumns='repeat(3, 1fr)'>
          {kind_colors.sort().map((value, index) => (<TextBtn key={index} value={value} text={value} isSelected={isKindColorSelected(value)} onClick={handleKindColorFilter} />))}
          <TextBtn value="none" text={"不拘"} isSelected={isKindColorSelected("none")} onClick={handleKindColorFilter} />
        </Grid>

      </Box>

      {/* <Box>
            <Flex justifyContent="space-between" alignItems="center" m="8px" >
              <Text fontWeight="bold">搜尋附近</Text>
              <Switch defaultChecked={false} onChange={(event) => { console.log("TODO:搜尋附近"); setIsNear(event.currentTarget.checked) }} />
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" m="8px" >
              <Text fontWeight="bold">互動音效</Text>
              <Switch defaultChecked={false} onChange={(event) => { console.log("TODO:互動音效"); setIsSoundEnable(event.currentTarget.checked) }} />
            </Flex>
          </Box> */}

      <Button bgColor="#000" w="95%" mx="8px" my="16px" rounded="100" onClick={handleAllFilter}  ><Text color="#fff">套用</Text></Button>

    </Box>)
}