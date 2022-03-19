import React, { useEffect, useState } from "react"
import LoadingGif from "./asset/logo_.gif"

import {
  Box,
  ChakraProvider,
  extendTheme,
  Image,
  Text
} from "@chakra-ui/react"
import { AppBar } from "./component/TopBar"
import { Route, Routes } from "react-router-dom"
import { Ctx, ctxObj } from "./commen/context"
import { routes } from "./commen/commen"
import { rootState } from "./redux/states"
import configureAppStore from "./redux/store"
import { Provider } from "react-redux"
import { TestN } from "./testcomponent/TestComponent"


//chakra costom theme
const myTheme = extendTheme(
  {
    semanticTokens: {
      colors: {
        fillColor: "#fda098", //not use
        bgColor: "#f7f7f7"
      }
    },
    components: {
      Container: {
        baseStyle: {
          maxW: "container.xl"
        }
      },
      Link: {
        baseStyle: {
          color: "#fda098"
        }
      }
    }
  }
)


export const App = () => {


  //用於判斷是否顯示main
  const [showMain, setShowMain] = useState(true)
  //網頁開啟後兩秒進入main , 之後可以改成loading完data後進入
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowMain(true)
    }, 2000)
    return () => clearTimeout(timeOut)
  }, [showMain])

  //init loading
  if (!showMain) return (
    <ChakraProvider theme={myTheme}>
      <InitLoading />
    </ChakraProvider>
  )

  //Main
  return (
    <ChakraProvider theme={myTheme}>
      <Ctx.Provider value={ctxObj}>
        <Provider store={configureAppStore()}>
          {/*TODO: Wrapper Auth state provider */}
          <AppBar />
          {/* Routes */}
          <Routes>
            {routes.map(value => <Route key={value.tit} path={value.path} element={value.component} />)}
          </Routes>
          <TestN/>
        </Provider>
      </Ctx.Provider>
    </ChakraProvider>
  )
}



const InitLoading = () => (
  <Box
    h="100vh"
    d="flex"
    justifyContent="center"
    alignItems="center"
    position="relative"
  >
    <Box>
      <Image src={LoadingGif} alt="InitLoading" />
    </Box>
    <Text fontSize="12px" position="absolute" bottom="2" textAlign="center">PetNi @ Code: Night.Xu / Design: K.T</Text>
  </Box>
)


