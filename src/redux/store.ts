import {  applyMiddleware, configureStore, createStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// Logger with default options
import logger from 'redux-logger'
import { composeWithDevTools } from "redux-devtools-extension";
import { ACTION_SHOW_ALL } from "./actions";
import { Animal } from "../types";
import { rootReducers } from "./reducers";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";
import { rootState } from "./states";









export default function configureAppStore(preloadState : typeof rootState) {

  // const middleware = [logger]
  // const middwareEnhancer  = applyMiddleware(...middleware)

  // const enhancers = [middwareEnhancer]
  // // const enhancers = [middlewareEnhancer, monitorReducersEnhancer]

  // const composedEnhancers = composeWithDevTools(...enhancers)

  // const store = createStore(rootReducers,preloadState,composedEnhancers)

  // Hot reloading ： !!!還沒用過 有需要特定動作在開發時才開啟才需要此動作,產品上架記得關閉！
  // see: https://redux.js.org/usage/configuring-your-store
  // if(process.env.NODE_ENV !== 'production' && module.hot){
  //   module.hot.accept('./reducers', () => store.replaceReducer(rootReducers))
  // }

  const store = configureStore({
    reducer: rootReducers,
    middleware: [logger, ...getDefaultMiddleware()],
    preloadedState : preloadState,
    // enhancers: [monitorReducersEnhancer]
  })

  return store
}






