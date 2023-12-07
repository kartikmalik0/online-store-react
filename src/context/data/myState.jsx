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

    const [loading, setLoading] = useState(false)
  return (
    <myContext.Provider value={{mode,toggleMode , loading , setLoading}}>
      {props.children}
    </myContext.Provider>
  )
}
 