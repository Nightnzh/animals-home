

import React from "react";
import { Text } from "@chakra-ui/react";
import { useGetAnimalsDataQuery } from "../service/animalsapi";


export const TestN = () =>  {

  const { data , isLoading , isFetching , error , isSuccess , } = useGetAnimalsDataQuery("")

  if(isLoading || isFetching){
    return <Text>loading</Text>
  }

  if(error){
    return <Text>{error}</Text>
  }

  if(isSuccess){

    // {console.log(data)}
    return (
      // <TT text={data.map(value => value.animal_kind).toString()}/>
      <Text>{ new Set(data.map(value => value.animal_colour))}</Text>
    )
  }

  return (
    <Text>
      {data ? "Null" : "TEST"}
    </Text>
  )
}

const TT = ({text } : {text: string}) => (<Text>{text}</Text>)