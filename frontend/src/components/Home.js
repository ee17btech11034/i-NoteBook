import React, { useContext } from 'react'
import NoteContext from '../contexts/notes/NoteContext'

const Home = () => {
  const context = useContext(NoteContext)
  const {notes, setNotes} = context
  return (
    <div className='container'>
      <h2>Here are my Notes</h2> 
      {notes.map((note)=>{
          return note.title
        })}

    </div>
  )
}

export default Home
