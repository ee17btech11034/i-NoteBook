import React, {useContext, useState} from 'react'
import NoteContext from '../contexts/notes/NoteContext'

const AddNote = () => {
  const context = useContext(NoteContext)
  const {addnote} = context
  const [note, setNote] = useState({title:"", description:"", tag:""})

  const OnclickSubmit = (e)=>{
    e.preventDefault();  //aisa krne se jab bhi submit hoga page reload nhi hoga. 
    addnote(note.title, note.description, note.tag)
    setNote({title:"", description:"", tag:""}) //jab ek baar note add kr diya to field ko khali kr do.
  }
  const OnChange = (e)=>{
    setNote({...note, [e.target.name]:e.target.value}) // iska matlab hai ki pahle note me jo bhi hai unko lo and then unke name ke anusar unki values ko update kr do.
  }
  return (
    <div className='my-3 mx-2'>
      <form>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" name="title" id="title" value={note.title} onChange={OnChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" name="description" id="description" value={note.description} onChange={OnChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" name="tag" id="tag" value={note.tag} onChange={OnChange}/>
        </div>
        <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={OnclickSubmit}>Add note</button>
      </form>
    </div>
  )
}

export default AddNote
