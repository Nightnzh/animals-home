import { Box, BoxProps, Center, Image } from "@chakra-ui/react";
import React from "react";
import caterror from "../../asset/caterror.png"
import dogerror from "../../asset/dogerror.png"


type ErrorImgProps = {
  kind : string
}

export const ErrorImg = ({ kind , ...props } : ErrorImgProps & BoxProps) => {

  const img = kind === "狗" ? dogerror : caterror 

  return (
    <Center height={"400px"} {...props} bgColor="#f7f7f7" rounded="40px">
      <Image srcSet={img} />
    </Center>
  )
}