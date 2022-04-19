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
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { ReactReduxFirebaseProvider } from "react-redux-firebase"
import { rrfProps } from "./redux/firebase"
import { myTheme } from "./theme"


//chakra costom theme



export const App = () => {


  //用於判斷是否顯示main
  const [showMain, setShowMain] = useState(false)
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
    <React.StrictMode>
      <ChakraProvider theme={myTheme}>
        <Ctx.Provider value={ctxObj}>
          <Provider store={store}>
            {/*TODO: Wrapper Auth state provider */}
            <ReactReduxFirebaseProvider  {...rrfProps}>
              <AppBar />

              {/* Routes */}
              <Routes>
                {routes.map(value => <Route key={value.tit} path={value.path} element={value.component} />)}
              </Routes>
              {/* <TestN/> */}
            </ReactReduxFirebaseProvider>
          </Provider>
        </Ctx.Provider>
      </ChakraProvider>
    </React.StrictMode>
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


