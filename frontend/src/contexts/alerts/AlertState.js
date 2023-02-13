import React from 'react'
import AlertContext from './AlertContext'

const AlertState = () => {

  const singup = ()=>{
    
  }
  return (
        <AlertContext.Provider value={{}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState
