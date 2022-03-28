import { applyMiddleware, combineReducers, configureStore, createStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// Logger with default options
import logger from 'redux-logger'
import { animalsReducer } from "./reducers";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";
import { animalRootState } from "./states";
import { animalsApiSlice } from "../service/animalsapi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";










// Hot reloading ： !!!還沒用過 有需要特定動作在開發時才開啟才需要此動作,產品上架記得關閉！
// see: https://redux.js.org/usage/configuring-your-store
// if(process.env.NODE_ENV !== 'production' && module.hot){
//   module.hot.accept('./reducers', () => store.replaceReducer(rootReducers))
// }

export const store = configureStore(
  { 
    reducer: 
    {
      animals : animalsReducer,
      [animalsApiSlice.reducerPath]: animalsApiSlice.reducer
    },
    middleware:  (getDefaultMiddleware) => [
      // logger,
      ...getDefaultMiddleware().concat(animalsApiSlice.middleware)
    ],
    // preloadedState : preloadState,
    // enhancers: [monitorReducersEnhancer]
  }
)

// console.log(store)

// store.subscribe(()=>{
//   console.log(store.getState())
// })

setupListeners(store.dispatch)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type StoreRootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch








