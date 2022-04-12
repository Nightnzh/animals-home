import { extendTheme } from "@chakra-ui/react";


export const myTheme = extendTheme(
  {
    semanticTokens: {
      colors: {
        tss: "#fda098", //not use
        bgColor: "#f7f7f7",
        actived : "#FFF",
        unActived : "#000"
      },
      colorScheme : {
        nnone : {
          bgColor : "#555",
        }
      }
    },
    components: {
      Container: {
        baseStyle: {
          maxW: "container.lg"
        }
      },
      Link: {
        baseStyle: {
          color: "#fda098"
        }
      },
      
    },
    
  }
)





