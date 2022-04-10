

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import  firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/analytics"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBt6v-tCbxwljSsxXPvp8KhBV0v1kSlQZE",
  authDomain: "animals-home.firebaseapp.com",
  projectId: "animals-home",
  storageBucket: "animals-home.appspot.com",
  messagingSenderId: "290229614280",
  appId: "1:290229614280:web:11ccb158adb31ff4e457fd",
  measurementId: "G-6G8HPDGTYY",
};





// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
// export const firestore = firebaseApp;
export const storage = firebase.storage()
// console.log("🚀 ~ file: firebaseconfig.ts ~ line 32 ~ firestore", firestore)

// console.log("🚀 ~ file: firebaseconfig.ts ~ line 35 ~ auth", auth)
export const analytics = firebaseApp.analytics()



