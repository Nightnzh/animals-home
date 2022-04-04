import { Box, Button, Container , Text} from "@chakra-ui/react";
import { type } from "os";
import { stringify } from "querystring";
import React from "react";
import { connect, ConnectedProps, useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import { StoreState } from "../../redux/store";
import { AuthAlert } from "./authAlert";

// 

/**
 * 
 * 
 * 
 * 
 * 
 * @returns 
 */



export const Send = () => {


  useFirestoreConnect([
    { collection : "test" }
  ])

  // const test = useSelector((state : StoreRootState) => state.firestore.ordered.test)
  

  return (
    
    <Box marginTop="60px"
      h="calc(100vh - 60px)" 
      maxH="calc(100vh - 60px)"
      background="#f7f7f7"
      position={"relative"}>
      <Box
        position={"absolute"}
        top={"50px"}
        right={"50px"}>
        <AuthAlert />
      </Box>

      <Container>
        {/* {!isLoaded(test) ? <>loading</> : ""} */}
      </Container>

    </Box>
  )
}


// export default connector(Send)