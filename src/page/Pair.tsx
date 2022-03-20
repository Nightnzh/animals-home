import { Box, Button, ButtonGroup, Center, Flex ,Grid,styled,Switch,TagLabel,Text} from "@chakra-ui/react"
import { useStore } from "react-redux"
import { FilterCatButton, FilterDogButton, FilterFemaleButton, FilterMaleButton, FilterNoneButton , } from "../component/Icons"
import { TestN } from "../testcomponent/TestComponent"


const kinds = ["狗","貓","all"]
const gender = ["公","母","all"]
const olds = ["幼齡","成年","all"]
const kind_colors = ["黃虎斑色","白色","虎斑白色","黃色","米色","三花色","黑黃色","虎斑色","黑色","咖啡色","灰色","黃白色","棕灰色","棕白色","棕色","黑棕色","咖啡棕色","花色","黑白色","黑虎斑色","灰白色","棕黑色","咖啡白色","黑灰色","花白色","咖啡黑色","灰黑色"]

export const Pair = () => {
 
  const store = useStore()

  const handleFilter = (kind : string , gender : string , old : string , kind_colors : string) => {


  }
  
  return (
    <Box boxShadow="inner">
      <Flex h="94vh" maxH="94vh" > 
        <Box   bgColor="#f9f9f9" display={{base:"none",xl:"block"}} >
          <Center  h="100%" >
            <Filter/>
          </Center>
        </Box>
        <Box flex={7}  bgColor="#f7f7f7">
          <TestN/>
        </Box>
      </Flex>
    </Box>
  )
}


const Filter = () => {

  return(
    <Box  px="10"  maxH="94vh"  overflowY="scroll"  >
      <Text pl="8px" fontWeight="bold">我想找尋</Text>
      <ButtonGroup>
        <FilterCatButton isSelected={true} selectedColor={"#fff"} defaultColor={"#000"}  />
        <FilterDogButton isSelected={true} selectedColor={"#fff"} defaultColor={"#000"} />
        <FilterNoneButton isSelected={true} selectedColor={"#fff"} defaultColor={"#000"} />
      </ButtonGroup>

      <Text pl="8px" fontWeight="bold">性別</Text>
      <ButtonGroup>
        <FilterMaleButton isSelected={false} selectedColor={"#fff"} defaultColor={"#70D4F4"}/>
        <FilterFemaleButton isSelected={false} selectedColor={"#fff"} defaultColor={"#FDAAA2"}/>
        <FilterNoneButton isSelected={true} selectedColor={"#fff"} defaultColor={"#000"} />
      </ButtonGroup>
      
      <Text pl="8px" fontWeight="bold">年齡</Text>
      <ButtonGroup >
        <TextBtn text={"幼齡"} isSelected={false} selectedColor={"#fff"} defaultColor={"#000"}/>
        <TextBtn text={"成年"} isSelected={false} selectedColor={"#fff"} defaultColor={"#000"}/>
        <TextBtn text={"不拘"} isSelected={true} selectedColor={"#fff"} defaultColor={"#000"}/>
      </ButtonGroup>


      <Text pl="8px" fontWeight="bold">顏色</Text>
      <ButtonGroup display="flex" flexWrap="wrap">
        <Grid templateColumns='repeat(3, 1fr)'>
          {kind_colors.sort().map((value,index) => (<TextBtn key={index} text={value} isSelected={false} selectedColor={"#fff"} defaultColor={"#000"}/>))}
          <TextBtn text={"不拘"} isSelected={true} selectedColor={"#fff"} defaultColor={"#000"} />
        </Grid>
      
      </ButtonGroup>

      <Box>
        <Flex justifyContent="space-between" alignItems="center" m="8px" >
          <Text fontWeight="bold">搜尋附近</Text>
          <Switch onChange={() =>{}} />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" m="8px" >
          <Text fontWeight="bold">互動音效</Text>
          <Switch  onChange={() =>{}} />
        </Flex>
      </Box>

      <Button bgColor="#000"  w="95%"  mx="8px" mt="16px" rounded="100"><Text color="#fff">套用</Text></Button>

    </Box>
  )
}


interface TextBtnProps {
  text: string,
  isSelected : boolean,
  selectedColor : string,
  defaultColor : string
}

const TextBtn = ( { text , isSelected,selectedColor,defaultColor } : TextBtnProps  ) => {

  const textColor = isSelected ? selectedColor : defaultColor
  const bgColor = isSelected ? "#000" : "#fff"

  return (
    <Button bgColor={bgColor} w="20" h="10" m="8px" _hover={{ bgColor : bgColor }} boxShadow="md" rounded="15">
      <Text color={textColor} fontWeight="400">{text}</Text>
    </Button>
  )
}


