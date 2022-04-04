import { applyMiddleware, combineReducers, compose, configureStore, createStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// Logger with default options
import logger from 'redux-logger'
import { AnimalRootState, animalsReducer } from "./animal";
import { AnimalApiRootState, animalsApiSlice } from "../service/animalsapi";
import { actionTypes, FirebaseReducer, firebaseReducer } from "react-redux-firebase";
import {  Profile , MySchema } from "./firebase";
import { firestoreReducer  , FirestoreReducer} from "redux-firestore"




// Optional: If you use the user profile option
// interface Profile {
//   name: string
//   email: string
// }


// // with both reducer types
// interface FirebaseRootState {
//   firebase: FirebaseReducer.Reducer<Profile>
// }



// Hot reloading ： !!!還沒用過 有需要特定動作在開發時才開啟才需要此動作,產品上架記得關閉！
// see: https://redux.js.org/usage/configuring-your-store
// if(process.env.NODE_ENV !== 'production' && module.hot){
//   module.hot.accept('./reducers', () => store.replaceReducer(rootReducers))
// }


interface RootState {
  animals :  AnimalRootState,
  firebase: FirebaseReducer.Reducer,
  firestore : FirestoreReducer.Reducer<MySchema> 
  [animalsApiSlice.reducerPath]:  AnimalApiRootState,
}


const reducer = combineReducers<RootState>({
  animals: animalsReducer,
  firebase : firebaseReducer,
  firestore : firestoreReducer,
  [animalsApiSlice.reducerPath]: animalsApiSlice.reducer,
})



export const store = configureStore(
  {
    reducer: reducer,
    middleware: (getDefaultMiddleware) => [
      // logger,
      ...getDefaultMiddleware(
        {
          serializableCheck : {
            ignoredActions : [actionTypes.LOGIN]
          }
        }
      ).concat(animalsApiSlice.middleware)
    ],
    
    // preloadedState : preloadState,
    // enhancers: [monitorReducersEnhancer]
  }
)




// setupListeners(store.dispatch)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type StoreState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch








