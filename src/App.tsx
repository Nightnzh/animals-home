import * as React from "react"


import {
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react"
import { AppBar } from "./component/TopBar"
import { Route, Routes } from "react-router-dom"
import { Ctx, ctxObj } from "./commen/context"
import { routes } from "./commen/commen"



const myTheme = extendTheme(
  { 
    semanticTokens : {
      colors : {
        fillColor : "#fda098"
      }
    },
    components : {
      Container :{
        baseStyle : {
          maxW : "container.xl"
        }
      },
      Link : {
        baseStyle : {
          color : "#fda098"
        }
      }
    }
  }
)


export const App = () => {
  // const [isLogin, setIsLogin] = React.useState(false)
  return (
    <ChakraProvider theme={myTheme}>
      <Ctx.Provider  value={ctxObj}>
      {/*TODO: Wrapper Auth state provider */}
      <AppBar/>
      {/* Routes */}
      <Routes>
        {routes.map(value => <Route key={value.tit} path={value.path} element={value.component}/>)}
      </Routes>
      </Ctx.Provider>
    </ChakraProvider>
  )
}


/** Default
 * 
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
 */