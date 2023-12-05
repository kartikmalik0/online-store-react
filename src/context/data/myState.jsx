import { useState } from 'react'
import myContext from './myContext'
export default function myState(props) {
    const [mode , setMode] = useState('light')

    const toggleMode = () =>{
        if(mode==='light'){
            setMode('dark')
            document.body.style.background = 'rgb(17,24,39)'
        }
        else{
            setMode('light')
            document.body.style.background = 'white'
        }
    }
  return (
    <myContext.Provider value={{mode,toggleMode}}>
      {props.children}
    </myContext.Provider>
  )
}
 