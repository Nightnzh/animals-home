import { Box, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalProps, Image, Text, IconButton, Icon, Button, HStack, Center, VStack } from "@chakra-ui/react";
import React from "react";
import { Animal } from "../../types";
import favIcon from "../../asset/fav.png"

type MyModalProps = {
  animal: Animal,
  // onFavClick : React.MouseEventHandler,
  // onXXClick : React.MouseEventHandler
}


export const AnimalModal = ({
  // onFavClick , onXXClick , 
  animal, ...props }: MyModalProps & ModalProps) => {

  const bo = ""
  const rounded = "20px"
  const fz24 = "24"
  const fz20 = "20"
  const fz16 = "16"
  const fz12 = "12"
  const bgWhite = "white"

  return (
    <>
      <Modal {...props}  >
        <ModalOverlay />
        <ModalContent pt="60px">
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton
            color="white"
            _hover={{ bgColor: "#000" }}
            mt="60px"
            rounded="20px"
            backgroundColor="#000"
            onClick={props.onClose}
          />
          <ModalBody p="16px" d="flex" justifyContent="center" alignItems="center" bgColor="#f7f7f7">

            <Flex border={bo} h="auto" w={"60vw"} minW="400px" maxW={"1200px"} gap="16px" flexDirection={['column', 'column', 'row']}>
              <Box flex="1" d="flex" alignItems="center" justifyContent="center" >
                <Image srcSet={animal.album_file} rounded={"40px"} padding="16px" bg="white" shadow={"2xl"} border="1px solid rgba(0,0,0,0.2)" />
              </Box>

              <Flex flex="1"  flexDirection={"column"}  justifyContent={"center"} border={bo} gap={"16px"}>
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  m="8px"
               
                  borderBottom={"1px"}>
                  <Box>
                    <Text fontSize={fz20} fontWeight="bold">{animal.animal_id}</Text>
                    <Text fontSize={fz16}>{animal.animal_place}</Text>
                  </Box>
                  <Image src={favIcon} boxSize="20" />
                </Flex >
                <Flex w="100%" rounded={rounded} bgColor={bgWhite} px="12" py="4">
                  <Box>
                    <Text fontSize={fz24} fontWeight="bold">{animal.animal_subid}</Text>
                    <Text color={"#555"}>{animal.cDate}</Text>
                  </Box>
                </Flex>
                <Flex rounded={rounded} bgColor={bgWhite} justifyContent="space-between" w="100%" px="12" py="4">
                  <VStack >
                    {icon1}
                    <Text fontWeight={"500"}>求包養</Text>
                  </VStack>
                  <VStack >
                    {icon2}
                    <Text fontWeight={"500"}>{animal.animal_sex === "M" ? "男生" : "女生"}</Text>
                  </VStack>
                  <VStack >
                    {icon3}
                    <Text fontWeight={"500"}>{animal.animal_colour}</Text>
                  </VStack>
                </Flex>
                <Box rounded={rounded} bgColor={bgWhite} w="100%" px="12" py="4" >
                  <Text>{animal.shelter_tel}</Text><br />
                  <Text>{animal.shelter_address}</Text><br />
                  <Text>
                    本站動物皆採現場互動面談後評估能否認養,不接受系統上的預約。
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}


const icon1 = <svg width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" y="0.5" width="68" height="68" rx="34" fill="#F8F8F8" />
  <path fillRule="evenodd" clipRule="evenodd" d="M40.1338 26.9879V27.9269C40.8809 27.9269 41.5975 28.2237 42.1257 28.7519C42.654 29.2802 42.9508 29.9967 42.9508 30.7439V41.0729C42.9508 41.82 42.654 42.5365 42.1257 43.0648C41.5975 43.5931 40.8809 43.8899 40.1338 43.8899H28.8658C28.1187 43.8899 27.4022 43.5931 26.8739 43.0648C26.3456 42.5365 26.0488 41.82 26.0488 41.0729V30.7439C26.0488 29.9967 26.3456 29.2802 26.8739 28.7519C27.4022 28.2237 28.1187 27.9269 28.8658 27.9269V26.9879C28.8658 26.4898 29.0637 26.0121 29.4159 25.6599C29.7681 25.3077 30.2458 25.1099 30.7438 25.1099H38.2558C38.7539 25.1099 39.2316 25.3077 39.5838 25.6599C39.936 26.0121 40.1338 26.4898 40.1338 26.9879ZM38.2558 26.9879H30.7438V30.7439H38.2558V26.9879ZM40.7978 41.7368C40.9739 41.5607 41.0728 41.3219 41.0728 41.0729V30.7439C41.0728 30.4948 40.9739 30.256 40.7978 30.0799C40.6217 29.9038 40.3829 29.8049 40.1338 29.8049V30.7439C40.1338 31.2419 39.936 31.7196 39.5838 32.0718C39.2316 32.424 38.7539 32.6219 38.2558 32.6219H30.7438C30.2458 32.6219 29.7681 32.424 29.4159 32.0718C29.0637 31.7196 28.8658 31.2419 28.8658 30.7439V29.8049C28.6168 29.8049 28.378 29.9038 28.2019 30.0799C28.0258 30.256 27.9268 30.4948 27.9268 30.7439V41.0729C27.9268 41.3219 28.0258 41.5607 28.2019 41.7368C28.378 41.9129 28.6168 42.0119 28.8658 42.0119H40.1338C40.3829 42.0119 40.6217 41.9129 40.7978 41.7368ZM34.9772 36.1445C34.9772 36.5341 34.6613 36.85 34.2716 36.85C33.882 36.85 33.5661 36.5341 33.5661 36.1445C33.5661 35.7548 33.882 35.4389 34.2716 35.4389C34.6613 35.4389 34.9772 35.7548 34.9772 36.1445ZM37.0939 36.85C37.4836 36.85 37.7994 36.5341 37.7994 36.1445C37.7994 35.7548 37.4836 35.4389 37.0939 35.4389C36.7042 35.4389 36.3883 35.7548 36.3883 36.1445C36.3883 36.5341 36.7042 36.85 37.0939 36.85ZM32.155 36.1445C32.155 36.5341 31.8391 36.85 31.4494 36.85C31.0597 36.85 30.7438 36.5341 30.7438 36.1445C30.7438 35.7548 31.0597 35.4389 31.4494 35.4389C31.8391 35.4389 32.155 35.7548 32.155 36.1445Z" fill="#FDAAA2" />
</svg>

const icon2 = <svg width="69" height="68" viewBox="0 0 69 68" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" width="68" height="68" rx="34" fill="#F8F8F8" />
  <path d="M42.3501 31.0955C42.3501 26.7574 38.8378 23.2451 34.4998 23.2451C30.1617 23.2451 26.6494 26.7574 26.6494 31.0955C26.6494 35.1602 29.743 38.5039 33.7031 38.9051V40.8706H32.0516C31.7783 40.8706 31.5573 41.0916 31.5573 41.3649V42.1209C31.5573 42.3942 31.7783 42.6152 32.0516 42.6152H33.7031V44.2143C33.7031 44.5167 33.9241 44.7551 34.1974 44.7551H34.9534C35.2267 44.7551 35.4476 44.5109 35.4476 44.2143V42.6152H37.0991C37.3724 42.6152 37.5934 42.3942 37.5934 42.1209V41.3649C37.5934 41.0916 37.3724 40.8706 37.0991 40.8706H35.4476V38.8819C39.3321 38.4167 42.3501 35.1079 42.3501 31.0955ZM28.9754 31.0955C28.9754 28.0484 31.4527 25.5712 34.4998 25.5712C37.5469 25.5712 40.0241 28.0484 40.0241 31.0955C40.0241 34.1426 37.5469 36.6198 34.4998 36.6198C31.4527 36.6198 28.9754 34.1426 28.9754 31.0955Z" fill="#FDAAA2" />
</svg>

const icon3 = <svg width="69" height="68" viewBox="0 0 69 68" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" width="68" height="68" rx="34" fill="#F8F8F8" />
  <path fillRule="evenodd" clipRule="evenodd" d="M43.2285 26.0484C42.0763 24.9044 40.7072 24.002 39.2016 23.3942C37.696 22.7864 36.0841 22.4855 34.4606 22.5091C31.4129 22.5015 28.487 23.7049 26.3265 25.8545C24.1661 28.0042 22.9481 30.9241 22.9405 33.9718C22.9328 37.0195 24.1362 39.9454 26.2859 42.1058C28.4356 44.2663 31.3554 45.4843 34.4031 45.4919C35.0598 45.503 35.7017 45.2958 36.2279 44.9027C36.7541 44.5096 37.1349 43.9529 37.3104 43.32C37.4224 42.8629 37.4212 42.3855 37.3071 41.929C37.1929 41.4724 36.9693 41.0506 36.6554 40.7C36.5829 40.6174 36.5355 40.5157 36.519 40.407C36.5025 40.2983 36.5175 40.1872 36.5623 40.0868C36.607 39.9864 36.6797 39.9009 36.7715 39.8405C36.8634 39.7802 36.9707 39.7474 37.0806 39.7462H38.9767C40.7612 39.7545 42.4829 39.0874 43.7959 37.8789C45.1089 36.6703 45.9161 35.0097 46.0554 33.2306C46.0981 31.904 45.8694 30.5827 45.3833 29.3477C44.8972 28.1127 44.164 26.99 43.2285 26.0484ZM39.0227 37.4479H37.1266C36.5728 37.4448 36.0301 37.6024 35.5642 37.9016C35.0982 38.2008 34.7291 38.6288 34.5016 39.1337C34.2741 39.6386 34.198 40.1986 34.2825 40.7459C34.367 41.2931 34.6085 41.8041 34.9777 42.2168C35.0496 42.2894 35.1004 42.3801 35.1247 42.4793C35.149 42.5784 35.1458 42.6824 35.1156 42.7799C35.0581 43.0212 34.7938 43.1706 34.4376 43.1936C33.1325 43.1769 31.846 42.8824 30.6636 42.3299C29.4811 41.7774 28.4299 40.9794 27.5798 39.9891C26.7297 38.9987 26.1002 37.8387 25.7332 36.5862C25.3662 35.3337 25.2701 34.0175 25.4513 32.7249C25.779 30.553 26.8643 28.5669 28.5151 27.118C30.1659 25.669 32.276 24.8506 34.4721 24.8074H34.564C35.8635 24.7904 37.1532 25.0338 38.3572 25.5232C39.5611 26.0127 40.6548 26.7383 41.5737 27.6572C42.2908 28.3748 42.8542 29.2308 43.2296 30.1732C43.605 31.1156 43.7845 32.1246 43.7571 33.1386C43.6381 34.3143 43.0889 35.4045 42.2151 36.1999C41.3412 36.9953 40.2043 37.4397 39.0227 37.4479ZM34.5637 29.4039C35.5156 29.4039 36.2874 28.6322 36.2874 27.6802C36.2874 26.7283 35.5156 25.9565 34.5637 25.9565C33.6117 25.9565 32.84 26.7283 32.84 27.6802C32.84 28.6322 33.6117 29.4039 34.5637 29.4039ZM37.615 29.2149C37.7657 28.9092 38.0037 28.655 38.2988 28.4846C38.4949 28.3712 38.7115 28.2977 38.9361 28.2682C39.1607 28.2386 39.3889 28.2536 39.6077 28.3123C39.8264 28.371 40.0315 28.4722 40.2111 28.6102C40.3908 28.7483 40.5414 28.9203 40.6545 29.1166C40.8247 29.4119 40.9035 29.751 40.8809 30.0911C40.8584 30.4312 40.7355 30.757 40.5279 31.0273C40.3202 31.2975 40.0371 31.5002 39.7143 31.6096C39.3915 31.719 39.0435 31.7303 38.7143 31.642C38.3851 31.5536 38.0895 31.3697 37.8648 31.1134C37.6402 30.8571 37.4965 30.54 37.452 30.202C37.4076 29.8641 37.4643 29.5206 37.615 29.2149ZM30.8293 28.4846C30.534 28.3145 30.1949 28.2357 29.8548 28.2582C29.5147 28.2808 29.1889 28.4036 28.9187 28.6113C28.6484 28.8189 28.4457 29.102 28.3363 29.4248C28.2269 29.7476 28.2157 30.0956 28.304 30.4248C28.3923 30.754 28.5762 31.0496 28.8325 31.2743C29.0888 31.499 29.406 31.6426 29.7439 31.6871C30.0818 31.7316 30.4253 31.6749 30.731 31.5242C31.0367 31.3734 31.2909 31.1355 31.4614 30.8404C31.5747 30.6442 31.6482 30.4276 31.6778 30.2031C31.7073 29.9785 31.6923 29.7503 31.6336 29.5315C31.5749 29.3127 31.4737 29.1076 31.3357 28.928C31.1977 28.7484 31.0256 28.5977 30.8293 28.4846ZM27.2223 33.9274C27.3512 33.6115 27.5709 33.341 27.8536 33.1501C28.0404 33.0222 28.2506 32.9326 28.4722 32.8864C28.6938 32.8403 28.9223 32.8385 29.1446 32.8813C29.3669 32.924 29.5785 33.0104 29.7672 33.1355C29.9558 33.2605 30.1179 33.4217 30.2438 33.6098C30.4356 33.8919 30.5393 34.2246 30.5419 34.5658C30.5444 34.9069 30.4457 35.2411 30.2582 35.5261C30.0707 35.8111 29.8028 36.034 29.4886 36.1667C29.1743 36.2994 28.8277 36.3358 28.4927 36.2714C28.1577 36.2069 27.8493 36.0446 27.6067 35.8048C27.364 35.565 27.198 35.2586 27.1295 34.9244C27.0611 34.5902 27.0934 34.2432 27.2223 33.9274Z" fill="#FDAAA2" />
</svg>

