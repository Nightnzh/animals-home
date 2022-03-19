import { Animal } from "../types";
import { ACTION_SHOW_ALL } from "./actions";


export const rootState = {
  filterVisibility : ACTION_SHOW_ALL,
  animalsData : [] as Animal[] 
}