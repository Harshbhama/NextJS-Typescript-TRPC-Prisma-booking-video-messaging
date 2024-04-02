
'use client'
import React, { useEffect, useState } from "react";
const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [toggleOsc, setToggle] = useState("up");

  useEffect(() => {
    if(counter <10 && toggleOsc === "up"){
      setTimeout(() => {
        setCounter(prev => prev +1)
      },200)
    } else if(counter === 10){
      setToggle("down");
    }
  },[counter, toggleOsc])

  useEffect(() => {
    if(counter > 0 && toggleOsc === "down"){
      setTimeout(() => {
        setCounter(prev => prev -1)
      },200)
    } else if(counter === 0){
      setToggle("up");
    }
  },[counter, toggleOsc])


  return(
     <div>{counter}</div>
  )  
}
export default Counter;