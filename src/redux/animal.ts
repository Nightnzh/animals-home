import { createSlice } from "@reduxjs/toolkit";
import { animalRootState } from "./ani_sate";




export const animalSlice = createSlice({
  name: "animals",
  initialState: animalRootState,
  reducers: {
    replaceAnimals : (state, action ) => ({
      ...state,
      animalsData : action.payload,
    }),

    setFilter : (state, action) => {
      return {
        ...state,
        filter : action.payload
      }
    },
    
  }
})

export const { replaceAnimals ,setFilter } = animalSlice.actions

export const animalsReducer =  animalSlice.reducer

export  type  AnimalRootState = ReturnType< typeof animalsReducer>