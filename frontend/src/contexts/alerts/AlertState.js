import React from 'react'
import AlertContext from 

const AlertState = () => {
  return (
        <NoteContext.Provider value={{notes, getallnotes, addnote, editnote, deletenote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default AlertState
