
import { configureStore, createAsyncThunk, createStore, Dispatch, Store } from '@reduxjs/toolkit'
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Animal } from '../types'


/**
 * Redux 非同步請求
 * 用於請求Animal
 * Lib : RTK Query || Redux-Saga || Redux-thunk  
 * 都需要 midderware 概念
 * 
 * RTK Query : 用於相同 baseurl 的 api , 為非常方便管理 api 的套件 , 可以 create 出不同參數 fetch data hook 來做使用 。 本例子是 get ,有點殺雞用牛刀的 feel  
 */

const api_url = "https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL"


export const animalsApiSlice = createApi({
  reducerPath:"animalsApi",
  baseQuery: fetchBaseQuery({baseUrl : api_url}),
  endpoints: builder => ({
    getAnimalsData : builder.query<Animal[],string>({
      query : () => ""
      })
  })
})


export const { useGetAnimalsDataQuery } = animalsApiSlice