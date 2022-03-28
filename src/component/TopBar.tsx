import { Box, Center, Container, Flex, Image, Link, Text } from "@chakra-ui/react"
import headerLogo from "../asset/header_logo.svg"
import React, { ReactElement, useContext } from "react"
import { Ctx } from "../commen/context"
import { Link as Linker, useLocation } from "react-router-dom"
// import { ColorModeSwitcher } from "../ColorModeSwitcher"


export const AppBar = () => {

  const ctx = useContext(Ctx)

  return (
    <Box p="2" position="fixed" w="100%" boxShadow="xl" h="60px" zIndex={"10000"}>
      <Container >
        <Flex justifyContent="space-between" py="1">
          <Center>
            <Image h="10" src={headerLogo} alt="header-logo"></Image>
          </Center>
          <Center>
            {ctx.routes.map(value => <LinkItem key={value.tit}
              iconObj={<value.iconObj boxSize="6" pathName={value.path} />}
              tit={value.tit} pathName={value.path}
              alt={null} />)
            }
            {/* <ColorModeSwitcher /> */}
          </Center>
        </Flex>
      </Container>
    </Box>
  )
}


interface LinkItemProps {
  iconObj: JSX.Element,
  tit: string,
  pathName: string,
  alt: string | null
}



const LinkItem = ({ pathName, tit, iconObj, alt }: LinkItemProps) => {

  //This is funcking useful
  const location = useLocation()

  return (
    <Link as={Linker} to={pathName} >
      <Flex>
        <Center >
          {iconObj}
          <Text w="60px" textAlign="center">{location.pathname === pathName ? tit : ""}</Text>
        </Center>
      </Flex>
    </Link>
  )
}


