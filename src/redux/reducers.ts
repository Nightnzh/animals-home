import { combineReducers, createReducer, createSlice } from "@reduxjs/toolkit";
import { ACTION_SHOW_CAT, ACTION_SHOW_DOG } from "./actions";
import { rootState } from "./states";




const animalSlice = createSlice({
  name: "animals",
  initialState: rootState,
  reducers: {
    filterAnimals :  (state,action) => {
      switch(action.type){
        case ACTION_SHOW_CAT :
          return {
            filterVisibility : ACTION_SHOW_CAT,
            animalsData : state.animalsData.filter(value => value.animal_kind === "貓")
          }
        case ACTION_SHOW_DOG :
          return {
            filterVisibility : ACTION_SHOW_DOG,
            animalsData : state.animalsData.filter(value => value.animal_kind === "狗")
          }
        default : 
          return state
      }
    }
  }
})

export const rootReducers = animalSlice.reducer