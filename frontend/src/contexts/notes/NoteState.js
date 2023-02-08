import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props)=>{
    const initialNotes = [
        {
          "_id": "63dce460ec698dcbf7c5581e0",
          "user": "63dbd6bf2cf99fd58c8ccc95",
          "title": "My note 1",
          "description": "Checking this note 1 if added",
          "tag": "Personal",
          "date": "2023-02-03T10:39:28.734Z",
          "__v": 0
        },
        {
          "_id": "63dce460ec698dcbf7c5581e1",
          "user": "63dbd6bf2cf99fd58c8ccc95",
          "title": "My note 2",
          "description": "Checking this note 1 if added",
          "tag": "Personal",
          "date": "2023-02-03T10:39:28.734Z",
          "__v": 0
        },
        {
          "_id": "63dce460ec698dcbf7c5581e2",
          "user": "63dbd6bf2cf99fd58c8ccc95",
          "title": "My note 3",
          "description": "Checking this note 1 if added",
          "tag": "Personal",
          "date": "2023-02-03T10:39:28.734Z",
          "__v": 0
        }
      ]
    const [notes, setNotes] = useState(initialNotes) 
    
    //Add a note 
    const addnote = (newNote1)=>{
        const newNote = {
            "_id": "63dce460ec698dcbf7c5581e25",
            "user": "63dbd6bf2cf99fd58c8ccc95",
            "title": "My note 3",
            "description": "Checking this note 1 if added",
            "tag": "Personal",
            "date": "2023-02-03T10:39:28.734Z",
            "__v": 0
          }
        // setNotes(notes.push(newNote)) //abhi bhi error hai bcz usi me update krne ke bajay ye sirf array update krta hai.,
        setNotes(notes.concat(newNote)) //ye ek naya array bana kr return krta hai
    }
    
    // Edit a Note 

    //Delete a note
    return (
        <NoteContext.Provider value={{notes, addnote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;