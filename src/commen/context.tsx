import React from "react";
import { routes } from "./commen";


export const ctxObj = {
  routes : routes
}

export const Ctx = React.createContext(ctxObj)