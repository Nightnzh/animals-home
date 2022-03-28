import { Animal } from "../types";
import { SHOW_ALL } from "./actions";



export type Filter = {
  kind: string,
  age: string,
  gender : string,
  kindColor : string,
  isNear : boolean,
  isSoundEnable : boolean
}

type AnimalState = {
  filter : Filter,
  animalsData : Animal[]
}

export const animalRootState : AnimalState = {
  filter : {
    kind: "none",
    age: "none",
    gender : "none",
    kindColor : "none",
    isNear : false,
    isSoundEnable : false
  },
  animalsData : [] 
}