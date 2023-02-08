import React, {useContext, useEffect} from 'react'
import NoteContext from '../contexts/notes/NoteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

const Notes = () => {
  const context = useContext(NoteContext)
  const {notes, getallnotes} = context
  useEffect(()=>{
    getallnotes()
  }, [])
  return (
    <>
    <AddNote/>
    <div className='row my-3 mx-2'>
      <h2>Here are my Notes</h2> 
      {notes.map((note)=>{
          return <NoteItem key={note._id} note={note}/> //key sab ki alag honi chahiye. to key de raha hu
        })}

    </div>
    </>
  )
}

export default Notes
