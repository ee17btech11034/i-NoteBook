import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props)=>{
    const host = 'http://localhost:5000' //db ke liye. beckend ki api
    const auth_tocken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkYmQ2YmYyY2Y5OWZkNThjOGNjYzk1In0sImlhdCI6MTY3NTM5OTMyMX0.qJvZ-L4Sts41w0d2A0BK7J2NkvwmGWrwwdW11eYMmo0'
    const [notes, setNotes] = useState([])

    //get all notes 
    const getallnotes = async ()=> {
      const url = `${host}/api/notes/fetchallnotes`
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
          'auth-token': auth_tocken
        },
      });
      const initialNotes = await response.json()
      setNotes(initialNotes)
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

    
    //Add a note 
    const addnote = async (title, description, tag="Public")=>{
      const url = `${host}/api/notes/addnewnote`
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
          'auth-token': auth_tocken        
        },
        body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
      });
      const newnote = await response.json()
      setNotes(notes.concat(newnote))
    }
    
    // Edit a Note 
    const updatenote = async (note_id)=>{
      // note_id = '63dce400ec698dcbf7c55811'
      // const url = `${host}/api/notes/updatenote/${note_id}`
      // const response = await fetch(url, {
      //   method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      //   headers: {
      //     'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
      //     'auth-token': auth_tocken        
      //   },
      //   body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
      // });
      // const deletednote = await response.json()
      // console.log(deletednote)
    }

    //Delete a note
    const deletenote = async (note_id)=>{
      // note_id = '63dce400ec698dcbf7c55811'
      const url = `${host}/api/notes/deletenote/${note_id}`
      const response = await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
          'auth-token': auth_tocken        
        }
      });
      const deletednote = await response.json()
      console.log(deletednote)

      const newnotes = notes.filter((note)=> {return note._id !==note_id})
      setNotes(newnotes)
    }


    return (
        <NoteContext.Provider value={{notes, getallnotes, addnote, updatenote, deletenote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;