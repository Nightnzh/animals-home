import React from "react";
import { routes } from "./commen";


export const ctxObj = {
  routes : routes,
  topSvgDefaultColor : "#d9d9d9",  
  topSvgFillColor : "#fda098",
}

export const Ctx = React.createContext(ctxObj)