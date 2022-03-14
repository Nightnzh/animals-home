import { Box, Center, Container, Flex, Image, Link, LinkBoxProps, LinkProps, styled } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import headerLogo from "../asset/header_logo.svg"
import { routes } from "../commen/commen"
import { useContext, useEffect } from "react"
import { Ctx } from "../commen/context"






export const AppBar = () => {

  const ctx = useContext(Ctx)

  return (
    <Box boxShadow="lg" p="2">
      <Container >
        <Flex justifyContent="space-between" py="1">
          <Center>
            <Image h="10" src={headerLogo} alt="header-logo"></Image>
          </Center>
          <Center>
            {ctx.routes.map(value => <LinkItem  key={value.tit} icon={value.icon} tit={value.tit} href={value.path} alt={undefined}/>)}
            {/* <ColorModeSwitcher /> */}
          </Center>
        </Flex>
      </Container>
    </Box>
  )
}


interface LinkItemProps {
  icon: string,
  tit: string,
  href: string,
  alt: string | undefined
}

const LinkItem = ({ href, icon, tit , alt = ""}: LinkItemProps) => {

  const isTarget  = window.location.pathname === href
  // console.log(tit)
  // console.log(window.location.pathname)
  // console.log(isTarget)
  const fillColor = "#fda098"

  return (
    <Link href={href} >
      <Flex>
        <Center>
          <Image boxSize="6"  src={icon} alt={alt} fill={isTarget ? fillColor : "#d9d9d9"}></Image>
          {isTarget ? <h3 color={"#666"}>{tit}</h3> : ""}
        </Center>
      </Flex>
    </Link>
  )
}

