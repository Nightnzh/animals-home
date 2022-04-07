import { Box, Button, Container, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Icon, Drawer, Text, useDisclosure, VStack, ButtonProps, FormControl, Image, useToast, FormLabel, Select, RadioGroup, Flex, useRadioGroup, Input, Divider, Textarea, FormErrorMessage } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone'
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { CatIconBtn } from "../../component/Icons";
import { StoreState } from "../../redux/store";
import { kind_colors } from "../pair/Filter";
import { catSvg, dogSvg, femaleSvg, maleSvg } from "./icon";
import { ImgFilePreview } from "./inputImg";
import { RadioCard } from "./radio";

// 

/**
 * 
 * 
 * 
 * 
 * 
 * @returns 
 */



export const Send = () => {


  return (

    <Box marginTop="60px"
      h="calc(100vh - 60px)"
      maxH="calc(100vh - 60px)"
      background="#f7f7f7"
      position={"relative"}>
      <Box
        position={"absolute"}
        top={"50px"}
        right={"50px"}>
        {/* <AuthAlert /> */}
      </Box>

      <Container py="32px">


        <MyDrawer />
        {/* {!isLoaded(test) ? <>loading</> : ""} */}

      </Container>

    </Box>
  )
}


const AddLetter = ({ onClick }: ButtonProps) => {


  return (
    <Button
      w="180px" h="240px"
      rounded={"40px"}
      bgColor="white"
      shadow={"xl"}
      cursor={"pointer"}
      onClick={onClick}
      color="teal"
    >
      <VStack gap={4}>
        <Icon width="60px" height="60px" viewBox="0 0 56 57" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28 0.5C22.4621 0.5 17.0486 2.14217 12.444 5.21885C7.83947 8.29553 4.25064 12.6685 2.13139 17.7849C0.012132 22.9012 -0.542361 28.5311 0.538025 33.9625C1.61841 39.394 4.28515 44.3831 8.20102 48.299C12.1169 52.2148 17.106 54.8816 22.5375 55.962C27.9689 57.0424 33.5988 56.4879 38.7151 54.3686C43.8315 52.2494 48.2045 48.6605 51.2811 44.056C54.3578 39.4514 56 34.0379 56 28.5C56 24.823 55.2758 21.182 53.8686 17.7849C52.4615 14.3877 50.399 11.301 47.799 8.70101C45.199 6.10097 42.1123 4.0385 38.7151 2.63137C35.318 1.22424 31.677 0.5 28 0.5V0.5ZM36.4 31.3H30.8V36.9C30.8 37.6426 30.505 38.3548 29.9799 38.8799C29.4548 39.405 28.7426 39.7 28 39.7C27.2574 39.7 26.5452 39.405 26.0201 38.8799C25.495 38.3548 25.2 37.6426 25.2 36.9V31.3H19.6C18.8574 31.3 18.1452 31.005 17.6201 30.4799C17.095 29.9548 16.8 29.2426 16.8 28.5C16.8 27.7574 17.095 27.0452 17.6201 26.5201C18.1452 25.995 18.8574 25.7 19.6 25.7H25.2V20.1C25.2 19.3574 25.495 18.6452 26.0201 18.1201C26.5452 17.595 27.2574 17.3 28 17.3C28.7426 17.3 29.4548 17.595 29.9799 18.1201C30.505 18.6452 30.8 19.3574 30.8 20.1V25.7H36.4C37.1426 25.7 37.8548 25.995 38.3799 26.5201C38.905 27.0452 39.2 27.7574 39.2 28.5C39.2 29.2426 38.905 29.9548 38.3799 30.4799C37.8548 31.005 37.1426 31.3 36.4 31.3Z" fill="#FDAAA2" />
        </Icon>
        <Text color={"#fca9a2"}>上傳寵物資料</Text>
      </VStack>

    </Button>
  )
}


const MyDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef(null)

  return (
    <>
      <AddLetter onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        size={"lg"}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>上傳寵物資料</DrawerHeader>

          <DrawerBody>
            <MyForm />
          </DrawerBody>

          <DrawerFooter>
            
            <Button w="100%" size="lg" colorScheme='blue'>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}



const MyForm = () => {

  const firebase = useFirebase()
  const authId = useSelector((state: StoreState) => state.firebase.auth.uid)
  const toast = useToast()


  const [isUploaded, setIsUploaded] = useState(false)

  const [imgFile, setImgFile] = useState<File | null>(null)


  const [kind, setkind] = useState("none")
  const [sex, setSex] = useState("none")
  const [age, setAge] = useState("none")
  const [name, setName] = useState("none")
  const [color, setColor] = useState("none")
  const [tell, setTell] = useState("none")
  const [address, setAddress] = useState("none")
  const [area, setArea] = useState("none")
  const [mark, setMark] = useState("")




  //上傳檔案至 firestorage
  const uploadFile = () => {

    // 監控上傳進度 ＝> https://firebase.google.com/docs/storage/web/upload-files?hl=zh&authuser=1#:~:text=upload%2Dfiles.js-,%E7%9B%A3%E6%8E%A7%E4%B8%8A%E5%82%B3%E9%80%B2%E5%BA%A6,-%E4%B8%8A%E5%82%B3%E6%99%82

    if (imgFile === null || imgFile === undefined) {
      return
    }


    setIsUploaded(true)
    firebase.uploadFile(authId, imgFile!!, undefined, { name: `${new Date().getTime()}.jpg` })
      .then((snapShot) => {
        console.log(snapShot);
        toast({
          status: "success",
          description: "上傳成功"
        })
      }, (t) => {
        console.log("🚀 ~ file: index.tsx ~ line 134 ~ .then ~ t", t)

      }).catch((e) => {
        console.log("🚀 ~ file: index.tsx ~ line 133 ~ .then ~ e", e)
        toast({
          status: "error",
          description: "上傳失敗"
        })
      }).finally(() => {
        setIsUploaded(false)
      })
  }

  return (
    <Box >
      <FormControl gap={"16px"} isRequired >
        <FormLabel>請先上傳寵物的相片</FormLabel>
        <ImgFilePreview setImgFile={setImgFile} />
      </FormControl>

      <KindSelect setValue={setkind} />
      <SexSelect setValue={setSex} />
      <AgeSelect setValue={setAge} />

      <FormControl mt="8px">
        <FormLabel>牠的名字</FormLabel>
        <Input
          bg={"#f7f7f7"}
          type={"text"}
          onChange={(value) => setName(value.target.value)}
          placeholder="若未取名可不填"
          size={"lg"} />
      </FormControl>

      <FormControl mt="8px" isRequired>
        <FormLabel>毛色</FormLabel>
        <Select
          onChange={value => setColor}
          defaultValue={""}
          bg={"#f7f7f7"}
          placeholder='Color Option'
          size='lg'>
          {kind_colors.map(value => (<option key={value} value={value}>{value}</option>))}
        </Select>
      </FormControl>
      <Divider mt="16px" />
      <FormControl mt="8px" gap={"8px"} isRequired>
        <FormLabel>聯絡方式</FormLabel>
        <Box gap={"8px"}>
          <Input
            type={"number"}
            onChange={value => setTell(value.target.value)}
            size={"lg"}
            bg="#f7f7f7"
            placeholder="電話" />
          <Flex>
            <Input
              onChange={value => setAddress(value.target.value)}
              type={"text"}
              size={"lg"}
              bg="#f7f7f7"
              placeholder="縣市" />
            <Input
              onChange={value => setArea(value.target.value)}
              type={"text"}
              size={"lg"}
              bg="#f7f7f7"
              placeholder="區域" />
          </Flex>
        </Box>
      </FormControl>
      <Divider mt="16px" />

      <FormControl mt="8px" gap={"8px"} >
        <FormLabel>狀況</FormLabel>
        <Textarea
          size={"lg"}
          bg="#f7f7f7"
          rounded={"20px"}
          placeholder="限40字"
          minH={"100px"}
          value={mark}
          onChange={ value=> setMark(value.target.value)}
        >
        </Textarea>
      </FormControl>

    </Box>
  )
}



interface SetValueProps {
  setValue: (nextValue: string) => void
}

const KindSelect = ({ setValue }: SetValueProps) => {

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'kind',
    defaultValue: '',
    onChange: setValue,
  })

  // const group = getRootProps()
  return (
    <FormControl gap={"16px"}
      mt="8px"
      isRequired>
      <FormLabel>種類</FormLabel>
      <Flex gap={"4px"} >
        <RadioCard  {...getRadioProps({ value: "貓" })}>{catSvg}</RadioCard>
        <RadioCard  {...getRadioProps({ value: "狗" })}>{dogSvg}</RadioCard>
      </Flex>
    </FormControl>
  )

}

const SexSelect = ({ setValue }: SetValueProps) => {

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'sex',
    defaultValue: 'none',
    onChange: setValue,
  })

  // const group = getRootProps()
  return (
    <FormControl gap={"16px"}
      mt="8px"  
      isRequired>
      <FormLabel>性別</FormLabel>
      <Flex gap={"4px"} flexBasis={"1 1 1"}>
        <RadioCard  {...getRadioProps({ value: "M" })} >{maleSvg}</RadioCard>
        <RadioCard  {...getRadioProps({ value: "F" })}>{femaleSvg}</RadioCard>
        <RadioCard  {...getRadioProps({ value: "" })}><Text fontWeight={"bold"}>不明</Text></RadioCard>
      </Flex>
    </FormControl>
  )
}

const AgeSelect = ({ setValue }: SetValueProps) => {

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'age',
    defaultValue: '',
    onChange: setValue,
  })

  // const group = getRootProps()
  return (
    <FormControl gap={"16px"}
      mt="8px"
      isRequired>
      <FormLabel>年齡</FormLabel>
      <Flex gap={"4px"} flexBasis={"1 1 1"}>
        <RadioCard  {...getRadioProps({ value: "ADULT" })}><Text fontWeight={"bold"}>幼齡</Text></RadioCard>
        <RadioCard  {...getRadioProps({ value: "CHILD" })}><Text fontWeight={"bold"}>成年</Text></RadioCard>
      </Flex>
    </FormControl>
  )
}