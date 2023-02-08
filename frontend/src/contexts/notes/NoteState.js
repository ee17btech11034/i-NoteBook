import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props)=>{
    const host = 'http://localhost:5000' //db ke liye. beckend ki api

    //get all notes 
    const getallnotes = async ()=> {
      const url = `${host}/api/notes/fetchallnotes`
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkYmQ2YmYyY2Y5OWZkNThjOGNjYzk1In0sImlhdCI6MTY3NTM5OTMyMX0.qJvZ-L4Sts41w0d2A0BK7J2NkvwmGWrwwdW11eYMmo0'
        },
      });
      const allnotes = await response.json()
      console.log(allnotes)
    }
    // //get all notes 
    // const getallnotes2 = async ()=> {
    //   const url = `${host}/api/notes/fetchallnotes`
    //   const response = await fetch(url, {
    //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //     headers: {
    //       'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
    //       'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkYmQ2YmYyY2Y5OWZkNThjOGNjYzk1In0sImlhdCI6MTY3NTM5OTMyMX0.qJvZ-L4Sts41w0d2A0BK7J2NkvwmGWrwwdW11eYMmo0'
    //     },
    //     body: JSON.stringify(data) // body data type must match "Content-Type" header
    //   });
    //   return response.json(); // parses JSON response into native JavaScript objects
    // }
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
    const addnote = (title, description, tag="Public")=>{
        const newNote = {
            "_id": "63dce460ec698dcbf7c5581e25",
            "user": "63dbd6bf2cf99fd58c8ccc95",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-02-03T10:39:28.734Z",
            "__v": 0
          }
        // setNotes(notes.push(newNote)) //abhi bhi error hai bcz usi me update krne ke bajay ye sirf array update krta hai.,
        setNotes(notes.concat(newNote)) //ye ek naya array bana kr return krta hai
    }
    
    // Edit a Note 

    //Delete a note
    return (
        <NoteContext.Provider value={{notes, getallnotes, addnote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;