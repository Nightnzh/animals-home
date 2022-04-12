import { Box, Button, Container, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Icon, Drawer, Text, useDisclosure, FormControl, useToast, FormLabel, Select, Flex, useRadioGroup, Input, Divider, Textarea, IconButton, IconButtonProps } from "@chakra-ui/react";
import { DateTimeFormatter, LocalDateTime } from "@js-joda/core";
import '@js-joda/timezone' // Just needs to be imported; registers itself automatically
import { Locale } from '@js-joda/locale_zh' // Get `Locale` from the prebuilt package of your choice
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isLoaded, useFirebase, useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { SendLetter } from "../../redux/firebase";
import { StoreState } from "../../redux/store";
import { Animal } from "../../types";
import { kind_colors } from "../pair/Filter";
import { catSvg, dogSvg, femaleSvg, maleSvg } from "../../component/Icons";
import { ImgFilePreview } from "./inputImg";
import { RadioCard } from "./radio";
import { LetterItem } from "./LetterItem";


export const Send = () => {

  useFirestoreConnect([
    {
      collection: "sendLetter",
      storeAs: "sendLetter"
    }
  ])

  const sendData = useSelector((state: StoreState) => state.firestore.ordered.sendLetter)



  return (
    <Box marginTop="60px"
      h="calc(100vh - 60px)"
      maxH="calc(100vh - 60px)"
      background="#f7f7f7"
      position={"relative"}
      overflowY={"scroll"}
    >

      {/* <Box
        position={"absolute"}
        top={"50px"}
        right={"50px"}>
        <AuthAlert />
      </Box> */}
      <Container my="32px" size={"md"} bg="#f6f6f6" zIndex={"0"} >
        <Text textAlign={["start", "center"]} fontSize={"2xl"} >所有用戶發的送養文</Text>


        {/* 顯示 */}
        <Flex flexDirection={"column"} justifyContent={"center"} mt="32px" gap="32px">
          {isLoaded(sendData) && sendData.map((value, index) => (
            <LetterItem key={index} docId={value.id.toString()} sendLetter={JSON.parse(JSON.stringify(value))} />
          ))}
        </Flex>
        <MyDrawer />
      </Container>

    </Box>
  )
}


const AddLetter = (props: IconButtonProps) => {

  return (
    <IconButton

      {...props}
    >
      <Icon width="50px" height="50px" viewBox="0 0 56 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28 0.5C22.4621 0.5 17.0486 2.14217 12.444 5.21885C7.83947 8.29553 4.25064 12.6685 2.13139 17.7849C0.012132 22.9012 -0.542361 28.5311 0.538025 33.9625C1.61841 39.394 4.28515 44.3831 8.20102 48.299C12.1169 52.2148 17.106 54.8816 22.5375 55.962C27.9689 57.0424 33.5988 56.4879 38.7151 54.3686C43.8315 52.2494 48.2045 48.6605 51.2811 44.056C54.3578 39.4514 56 34.0379 56 28.5C56 24.823 55.2758 21.182 53.8686 17.7849C52.4615 14.3877 50.399 11.301 47.799 8.70101C45.199 6.10097 42.1123 4.0385 38.7151 2.63137C35.318 1.22424 31.677 0.5 28 0.5V0.5ZM36.4 31.3H30.8V36.9C30.8 37.6426 30.505 38.3548 29.9799 38.8799C29.4548 39.405 28.7426 39.7 28 39.7C27.2574 39.7 26.5452 39.405 26.0201 38.8799C25.495 38.3548 25.2 37.6426 25.2 36.9V31.3H19.6C18.8574 31.3 18.1452 31.005 17.6201 30.4799C17.095 29.9548 16.8 29.2426 16.8 28.5C16.8 27.7574 17.095 27.0452 17.6201 26.5201C18.1452 25.995 18.8574 25.7 19.6 25.7H25.2V20.1C25.2 19.3574 25.495 18.6452 26.0201 18.1201C26.5452 17.595 27.2574 17.3 28 17.3C28.7426 17.3 29.4548 17.595 29.9799 18.1201C30.505 18.6452 30.8 19.3574 30.8 20.1V25.7H36.4C37.1426 25.7 37.8548 25.995 38.3799 26.5201C38.905 27.0452 39.2 27.7574 39.2 28.5C39.2 29.2426 38.905 29.9548 38.3799 30.4799C37.8548 31.005 37.1426 31.3 36.4 31.3Z" fill="currentColor" />
      </Icon>

    </IconButton>
  )
}


const MyDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef(null)

  const toast = useToast()
  const auth = useSelector((state: StoreState) => state.firebase.auth)

  return (
    <>
      <AddLetter _hover={undefined} bg={"rgba(0,0,0,0)"}
        position={"fixed"}
        bottom="20px"
        right={"20px"} onClick={() => { if (!auth.isEmpty) { onOpen(); } else { toast({ status: "warning", description: "請先登入", position: "top" }); } }} aria-label={""} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        size={"md"}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="#FFF">
          <DrawerCloseButton />
          <DrawerHeader>上傳寵物資料</DrawerHeader>

          <DrawerBody>
            <MyForm onSuccess={onClose} />
          </DrawerBody>
          {/* <DrawerFooter>

            <Button onClick={handleSubmit} w="100%" size="lg" colorScheme='blue'>Submit</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  )
}


interface SuccessProps {
  onSuccess: () => void
}

const MyForm = ({ onSuccess }: SuccessProps) => {

  const firebase = useFirebase()
  const fireStroe = useFirestore()
  const auth = useSelector((state: StoreState) => state.firebase.auth)
  const toast = useToast()


  const [isUploaded, setIsUploaded] = useState(false)

  const [imgFile, setImgFile] = useState<File | null>(null)


  const [kind, setkind] = useState("none")
  const [sex, setSex] = useState("none")
  const [age, setAge] = useState("none")
  const [name, setName] = useState("")
  const [color, setColor] = useState("none")
  const [tell, setTell] = useState("none")
  const [address, setAddress] = useState("")
  const [area, setArea] = useState("")
  const [mark, setMark] = useState("")




  //上傳檔案至 firestorage //for test not use
  const uploadFile = () => {

    // 監控上傳進度 ＝> https://firebase.google.com/docs/storage/web/upload-files?hl=zh&authuser=1#:~:text=upload%2Dfiles.js-,%E7%9B%A3%E6%8E%A7%E4%B8%8A%E5%82%B3%E9%80%B2%E5%BA%A6,-%E4%B8%8A%E5%82%B3%E6%99%82

    if (imgFile === null || imgFile === undefined) {
      return
    }


    setIsUploaded(true)
    firebase.uploadFile(auth.uid, imgFile!!, undefined, { name: `${new Date().getTime()}.jpg` })
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


  const handleSubmit = async () => {


    //檢查資料
    if (
      imgFile === null || imgFile === undefined ||
      kind === "none" ||
      sex === "none" ||
      age === "none" ||
      color === "none" || color === "" ||
      tell === "" ||
      address === "" ||
      area === ""
    ) {
      alert("有資料未填寫")
      return
    }





    try {
      const imgFileNameTimeFormater = DateTimeFormatter.ofPattern("YYYY-MM-dd-HH-mm-ss").withLocale(Locale.CHINESE)
      const imgFileName = LocalDateTime.now().format(imgFileNameTimeFormater).toString() + ".jpg"
      const dateTimeFormater = DateTimeFormatter.ofPattern("YYYY-MM-dd").withLocale(Locale.CHINESE)
      const dateTimeString = LocalDateTime.now().format(dateTimeFormater).toString()

      setIsUploaded(true)
      const t1 = await firebase.uploadFile("sendLetter", imgFile!!, undefined, { name: imgFileName })

      const imgUrl = await t1.uploadTaskSnapshot.ref.getDownloadURL()


      const ani: Animal = {
        animal_id: new Date().getTime(),
        animal_subid: "",
        animal_area_pkid: 0,
        animal_shelter_pkid: 0,
        animal_place: `${address + area}`,
        animal_kind: kind,
        animal_sex: sex,
        animal_bodytype: "",
        animal_colour: color,
        animal_age: age,
        animal_sterilization: "",
        animal_bacterin: "",
        animal_foundplace: "",
        animal_title: "",
        animal_status: "",
        animal_remark: mark,
        animal_caption: "",
        animal_opendate: "",
        animal_closeddate: "",
        animal_update: "",
        animal_createtime: dateTimeString,
        shelter_name: "",
        album_file: imgUrl,
        album_update: "",
        cDate: dateTimeString,
        shelter_address: "",
        shelter_tel: tell,
        animal_Variety: ""
      }

      const sendLetter: SendLetter = {
        ani: ani,
        senderName: auth.displayName!!,
        senderId: auth.uid,
        aniName: name,
        letterCDate: dateTimeString
      }
      await fireStroe.collection("sendLetter").add(sendLetter)
      onSuccess()
      toast({
        status: "success",
        description: "上傳成功"
      })
    }
    catch (e) {
      alert(e)
      toast({
        status: "error",
        description: "上傳失敗"
      })
    } finally {
      setIsUploaded(false)
    }
  }

  return (
    <Box h="100%" >
      <FormControl gap={"16px"} isRequired >
        <FormLabel>請先上傳寵物的相片</FormLabel>
        <ImgFilePreview setImgFile={setImgFile} />
      </FormControl>

      <KindSelect value={kind} setValue={setkind} />
      <SexSelect value={sex} setValue={setSex} />
      <AgeSelect value={age} setValue={setAge} />

      <FormControl mt="8px">
        <FormLabel>牠的名字</FormLabel>
        <Input
          bg={"#f7f7f7"}
          type={"text"}
          onChange={(value) => setName(value.target.value)}
          placeholder="若未取名可不填"
          value={name}
          size={"lg"} />
      </FormControl>

      <FormControl mt="8px" isRequired>
        <FormLabel>毛色</FormLabel>
        <Select
          onChange={value => setColor(value.target.value)}
          // defaultValue={""}
          value={color}
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
            value={tell}
            onChange={value => setTell(value.target.value)}
            size={"lg"}
            bg="#f7f7f7"
            placeholder="電話" />
          <Flex>
            <Input
              value={address}
              onChange={value => setAddress(value.target.value)}
              type={"text"}
              size={"lg"}
              bg="#f7f7f7"
              placeholder="縣市" />
            <Input
              value={area}
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
          onChange={value => setMark(value.target.value)}
        >
        </Textarea>
      </FormControl>
      <Button
        my="32px"
        bottom="0"
        w="100%"
        size="lg"
        onClick={handleSubmit}
        isLoading={isUploaded}
        colorScheme='blue'>Submit</Button>
    </Box>
  )
}



interface SetValueProps {
  value: string,
  setValue: (nextValue: string) => void
}

const KindSelect = ({ value, setValue }: SetValueProps) => {

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'kind',
    defaultValue: value,
    onChange: setValue,
    value: value
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

const SexSelect = ({ value, setValue }: SetValueProps) => {

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'sex',
    defaultValue: value,
    onChange: setValue,
    value: value
  })

  // const group = getRootProps()
  return (
    <FormControl gap={"16px"}
      mt="8px"
      isRequired>
      <FormLabel>性別</FormLabel>
      <Flex gap={"4px"} >
        <RadioCard  {...getRadioProps({ value: "M" })} >{maleSvg}</RadioCard>
        <RadioCard  {...getRadioProps({ value: "F" })}>{femaleSvg}</RadioCard>
        <RadioCard  {...getRadioProps({ value: "" })}><Text fontWeight={"bold"}>不明</Text></RadioCard>
      </Flex>
    </FormControl>
  )
}

const AgeSelect = ({ value, setValue }: SetValueProps) => {

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'age',
    defaultValue: value,
    onChange: setValue,
    value: value
  })

  // const group = getRootProps()
  return (
    <FormControl gap={"16px"}
      mt="8px"
      isRequired>
      <FormLabel>年齡</FormLabel>
      <Flex gap={"4px"} >
        <RadioCard  {...getRadioProps({ value: "ADULT" })}><Text fontWeight={"bold"}>幼齡</Text></RadioCard>
        <RadioCard  {...getRadioProps({ value: "CHILD" })}><Text fontWeight={"bold"}>成年</Text></RadioCard>
      </Flex>
    </FormControl>
  )
}





