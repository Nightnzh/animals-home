import React, { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import { StoreState } from "../../redux/store";



type AuthLoadProps = {
  children : JSX.Element
}


export function AuthIsLoaded({ children } : AuthLoadProps) {
  const auth = useSelector((state : StoreState) => state.firebase.auth)
  if (!isLoaded(auth)) return <div>splash screen...</div>;
  return children
}


