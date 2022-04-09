import { firebaseApp } from "../firebase/firebaseconfig"
import { store } from "./store"
import { createFirestoreInstance } from 'redux-firestore' // <- needed if using firestore
import { Animal } from "../types"



// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
  useFirestoreForProfile: true,
}



export interface Profile {
  userName : string,
  userEmail : string,
}


export interface SendLetter {
  ani : Animal,
  senderName : string,
  senderId: string,
  aniName : string,
  letterCDate : string
}

export interface MySchema {
  favs : Animal[],
  sendLetter : SendLetter
}




export const rrfProps = {
  firebase : firebaseApp,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  initializeAuth : true
}


