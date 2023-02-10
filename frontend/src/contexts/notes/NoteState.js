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
    const editnote = async (note_id, title, description, tag)=>{
      const url = `${host}/api/notes/updatenote/${note_id}`
      const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
          'auth-token': auth_tocken        
        },
        body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
      });
      const editednote = await response.json()
      console.log(editednote)

      //Logic to edit in client side 
      // for (let index=0; index < notes.length; index++){
      //   const element = notes[index]
      //   if (element._id === note_id){
      //     notes[index].title = title
      //     notes[index].description = description
      //     notes[index].tag = tag
      //     break
      //   }
      // }
      //Mene upar wala nhi use kiya bcz me directly state ko aise set ya change nhi kr skta hu. 
      let newNotee = JSON.parse(JSON.stringify(notes)) //isse me iski ek deep copy bana raha hu and usko update krunga
      for (let index=0; index < newNotee.length; index++){
        const element = newNotee[index]
        if (element._id === note_id){
          newNotee[index].title = title
          newNotee[index].description = description
          newNotee[index].tag = tag
          break
        }
      }
      setNotes(newNotee)
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
        <NoteContext.Provider value={{notes, getallnotes, addnote, editnote, deletenote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;