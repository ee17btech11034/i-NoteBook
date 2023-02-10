import React, {useContext} from 'react'
import NoteContext from '../contexts/notes/NoteContext'

const NoteItem = (props) => {
  const context = useContext(NoteContext)
  const {deletenote} = context
  const {note, updatenote} = props 

  const OnclickDelete = ()=>{
    deletenote(note._id) //jis note ko delete krna hai uski id
  }
  const OnclickEdit = ()=>{
    updatenote(note._id) //jis note ko update krna hai uski id
  }
  return (
    <div className='col-md-3'>
      <div className="card my-3" >
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <i className="fa-regular fa-pen-to-square mx-2 edit-hover" onClick={OnclickEdit}></i>
            <i className="fa-solid fa-trash-can mx-2 delete-hover" onClick={OnclickDelete}></i>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
