import { Avatar, Box, Button, Center, Container, Flex, HStack, IconButton, Image, Link, Menu, MenuButton, MenuItem, MenuList, Spacer, Text } from "@chakra-ui/react"
import headerLogo from "../asset/header_logo.svg"
import { useContext } from "react"
import { Ctx } from "../commen/context"
import { Link as Linker, useLocation } from "react-router-dom"
import { AuthAlert } from "./auth/authAlert"
import { useDispatch, useSelector } from "react-redux"
import { StoreState } from "../redux/store"
import { FaAccusoft, FaBaby, FaChevronDown, FaHamburger, FaSignOutAlt, FaStumbleupon, FaUserMinus } from "react-icons/fa"
import { useFirebase } from "react-redux-firebase"
import { ColorModeSwitcher } from "../ColorModeSwitcher"
// import { ColorModeSwitcher } from "../ColorModeSwitcher"


export const AppBar = () => {

  const ctx = useContext(Ctx)
  const auth = useSelector((state: StoreState) => state.firebase.auth)
  const location = useLocation()



  return (
    <Box p="2" position="fixed" top="0" w="100%" boxShadow="xl" h="60px" zIndex={"1000"} bgColor="whiteAlpha">
      <Container >
        <Flex py="1" justifyContent={"space-between"}>
          <Center>
            {
              !auth.isEmpty && location.pathname === "/send" ?
                <HStack gap={"8px"}>
                  <Avatar src={auth.photoURL!!} boxSize="40px" />
                  <Text fontWeight={"bold"}>{auth.displayName}</Text>
                </HStack>
                :
                <Image h="10" src={headerLogo} alt="header-logo" />
            }
          </Center>
          {/* <Spacer /> */}
          <Center  >
            <Flex>
              {ctx.routes.map(value => <LinkItem key={value.tit}
                iconObj={<value.iconObj boxSize="6" pathName={value.path} />}
                tit={value.tit} pathName={value.path}
                alt={null} />)
              }
            </Flex>


            <AuthAlert />
            {/* <MyMenu /> */}
          </Center>

        </Flex>
      </Container>
    </Box>
  )
}

//not use
const MyMenu = () => {

  const firebase = useFirebase()
  const auth = useSelector((state: StoreState) => state.firebase.auth)

  return (
    <Menu >
      <MenuButton
        as={Button}
        aria-label='Options'
        variant='outline'
        colorScheme="teal"
      >LOGIN</MenuButton>
      <MenuList>
        {!auth.isEmpty && <MenuItem icon={<FaUserMinus />} onClick={() => { alert("TODO:新增個人檔案設定、信箱驗證、手機驗證等") }}>
          Profile
        </MenuItem>}

        {/* {auth.isEmpty && <MenuItem  onClick={() => { }} icon={<FaAccusoft />}>Login</MenuItem>} */}
        {/* {!auth.isEmpty && <MenuItem onClick={() => firebase.logout()} icon={<FaSignOutAlt />}>Logout</MenuItem>} */}
      </MenuList>
    </Menu>
  )
}


interface LinkItemProps {
  iconObj: JSX.Element,
  tit: string,
  pathName: string,
  alt: string | null
}



const LinkItem = ({ pathName, tit, iconObj }: LinkItemProps) => {

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






