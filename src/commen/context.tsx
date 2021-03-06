import React from "react";
import { routes } from "./commen";


export const ctxObj = {
  routes : routes,
  topSvgDefaultColor : "#d9d9d9",  
  topSvgFillColor : "#fda098",

  bgDefaultColor : "#fff",
  bgSelectedColor : "#000",
  selectedColor : "#fff",
  unselectedColor : "#000",
  maleIconColor : "#70D4F4",
  femaleIconColor : "#FDAAA2"
}

export const Ctx = React.createContext(ctxObj)