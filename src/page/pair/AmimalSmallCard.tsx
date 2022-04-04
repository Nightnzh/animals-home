import { Avatar, Box, Flex, Image, VStack, Text, HStack, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Animal } from "../../types";
import { AnimalModal } from "../../component/AnimalInfoModal";



type AnimalSmallViewerProps = {
  animal: Animal,
  onClick: React.MouseEventHandler
}




export const AnimalSmallCard = ({ animal }: AnimalSmallViewerProps) => {


  const { isOpen, onOpen, onClose } = useDisclosure() // controller modal

  return (
    <>
      <Flex onClick={onOpen}
        alignItems="center"
        background="#fff"
        rounded={"20px"}
        p="16px"
        px="32px"
        boxShadow={"xl"}
        cursor="pointer"
        _hover={{
          opacity : "1.3"
        }}
        >
        <Avatar src={animal.album_file} mr="16px" border={"1px solid #888"} >
        </Avatar>
        <VStack textAlign={"start"}>
          <HStack align={"start"} fontSize={"16px"} fontWeight={"bold"}>
            <Text>{animal.animal_id}</Text>
            {animal.animal_sex === "M" ? maleIcon : femaleIcon}
          </HStack>
          <Text fontSize={"12px"} noOfLines={1} color="#555">
            {animal.shelter_name}
          </Text>
        </VStack>
      </Flex>

      <AnimalModal 
        size="full"
        animal={animal}
        onClose={onClose} children={undefined} isOpen={isOpen}        
      />

    </>
  )
}

const maleIcon = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.0545 5.18112L15.8585 3.37704L15.9121 4.69097C15.9203 4.91339 16.1057 5.08226 16.3281 5.07402L17.4649 5.0246C17.6873 5.01636 17.8562 4.83101 17.848 4.60859L17.6791 0.53501C17.6708 0.31259 17.4855 0.143715 17.2631 0.151953L13.1895 0.320828C12.9671 0.329065 12.7982 0.514415 12.8064 0.736835L12.8559 1.87365C12.8641 2.09607 13.0494 2.26494 13.2719 2.25671L14.5611 2.20316L12.8188 3.94545C9.73374 1.47 5.21532 1.66358 2.35269 4.52621C-0.719996 7.5989 -0.719998 12.5745 2.35269 15.6472C5.42538 18.7199 10.4051 18.7158 13.4737 15.6472C16.3363 12.7846 16.5299 8.26616 14.0545 5.18112ZM4.00025 13.9997C1.84195 11.8414 1.84195 8.33207 4.00025 6.17377C6.15855 4.01547 9.66784 4.01547 11.8261 6.17377C13.9844 8.33207 13.9844 11.8414 11.8261 13.9997C9.66784 16.158 6.15855 16.158 4.00025 13.9997Z" fill="#70D4F4" />
</svg>

const femaleIcon = <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.8501 8.09548C15.8501 3.75743 12.3378 0.245117 7.99978 0.245117C3.66173 0.245117 0.149414 3.75743 0.149414 8.09548C0.149414 12.1602 3.24304 15.5039 7.20311 15.9051V17.8706H5.55163C5.27832 17.8706 5.05735 18.0916 5.05735 18.3649V19.1209C5.05735 19.3942 5.27832 19.6152 5.55163 19.6152H7.20311V21.2143C7.20311 21.5167 7.42408 21.7551 7.69739 21.7551H8.45335C8.72666 21.7551 8.94764 21.5109 8.94764 21.2143V19.6152H10.5991C10.8724 19.6152 11.0934 19.3942 11.0934 19.1209V18.3649C11.0934 18.0916 10.8724 17.8706 10.5991 17.8706H8.94764L8.94764 15.8819C12.8321 15.4167 15.8501 12.1079 15.8501 8.09548ZM2.47545 8.09548C2.47545 5.04838 4.95267 2.57115 7.99978 2.57115C11.0469 2.57115 13.5241 5.04838 13.5241 8.09548C13.5241 11.1426 11.0469 13.6198 7.99978 13.6198C4.95267 13.6198 2.47545 11.1426 2.47545 8.09548Z" fill="#FDAAA2" />
</svg>
