import { Avatar, Box, Button, Center, Container, Flex, HStack, IconButton, Image, Link, Menu, MenuButton, MenuItem, MenuList, Text, useMediaQuery, useToast } from "@chakra-ui/react"
import headerLogo from "../asset/header_logo.svg"
import { useContext } from "react"
import { Ctx } from "../commen/context"
import { Link as Linker, useLocation, useNavigate } from "react-router-dom"
import { AuthAlert } from "./auth/authAlert"
import { useSelector } from "react-redux"
import { StoreState } from "../redux/store"
import { FaAccusoft, FaHamburger, FaSignOutAlt, FaUserMinus } from "react-icons/fa"
import { useFirebase } from "react-redux-firebase"
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import firebase from "firebase"


export const AppBar = () => {

  const ctx = useContext(Ctx)
  const auth = useSelector((state: StoreState) => state.firebase.auth)
  const location = useLocation()
  const [isMax700] = useMediaQuery("(max-width:700px)")

  

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

          {!isMax700 ?
            <Center  >
              <Flex>
                {ctx.routes.map(value => <LinkItem key={value.tit}
                  iconObj={<value.iconObj boxSize="6" pathName={value.path} />}
                  tit={value.tit} pathName={value.path}
                  alt={null} />)
                }

              </Flex>
              <AuthAlert />
            </Center>
            : <MyMenu />
          }



          {/* <ColorModeSwitcher/> */}
          {/* <MyMenu /> */}

        </Flex>
      </Container>
    </Box>
  )
}

//not use
const MyMenu = () => {

  const firebasee = useFirebase()
  const auth = useSelector((state: StoreState) => state.firebase.auth)
  const ctx = useContext(Ctx)
  const nav = useNavigate()
  const toast = useToast()

  function loginWithGoogle() {


    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    firebasee.auth().signInWithPopup(googleAuthProvider)
      .then(() => {
        toast({
          status: "success",
          description: "Login success."
        })
      })
      .catch(e => {
        toast({
          status: "error",
          description: "Login error."
        })
      })
      
  }

  return (
    <>
      <Menu >

        <MenuButton
          as={IconButton}
          aria-label='Options'
          variant='outline'
          colorScheme="teal"
          children={<Center><FaHamburger /></Center>}
        />

        <MenuList>
          {ctx.routes.map(value => (
            <MenuItem key={value.tit} onClick={() => {
              console.log('tews');
              nav(value.path, { replace: true })
            }} icon={<value.iconObj pathName={value.path} />}> {value.tit} </MenuItem>
          ))
          }


          {auth.isEmpty && <MenuItem onClick={loginWithGoogle} icon={<FaAccusoft />}>Login</MenuItem>}
          {!auth.isEmpty && <MenuItem onClick={() => firebasee.logout()} icon={<FaSignOutAlt />}>{auth.displayName+"(Logout)"}</MenuItem>}
        </MenuList>
      </Menu>
    </>
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






