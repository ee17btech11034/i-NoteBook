import React, {useContext, useEffect, useRef, useState} from 'react'
import NoteContext from '../contexts/notes/NoteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

const Notes = () => {
  const context = useContext(NoteContext);
  const {notes, getallnotes, editnote} = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({note_id:"", etitle:"", edescription:"", etag:""});

  useEffect(()=>{
    getallnotes()
    // eslint-disable-next-line
  }, [])

  const OnclickSubmit = ()=>{
    editnote(note.note_id, note.etitle, note.edescription, note.etag);
    refClose.current.click()
  }
  const OnChange = (e)=>{
    setNote({...note, [e.target.name]:e.target.value}) // iska matlab hai ki pahle note me jo bhi hai unko lo and then unke name ke anusar unki values ko update kr do.
  }
  const updatenote = (currentnote)=>{
    // ref.current.focus()
    ref.current.click()
    setNote({note_id: currentnote._id, etitle:currentnote.title, edescription:currentnote.description, etag:currentnote.tag})
  }
  return (
    <>
    <AddNote/>

    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Launch static backdrop modal</button>

    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Update Note</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" name="etitle" id="etitle" value={note.etitle} onChange={OnChange}/>
              </div>
              <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" name="edescription" id="edescription" value={note.edescription} onChange={OnChange}/>
              </div>
              <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" name="etag" id="etag" value={note.etag} onChange={OnChange}/>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button"  className="btn btn-primary" onClick={OnclickSubmit}>Update Note</button>
          </div>
        </div>
      </div>
    </div>

    <div className='row my-3 mx-2'>
      <h2>Here are my Notes</h2> 
      {notes.map((note)=>{
          return <NoteItem key={note._id} updatenote={updatenote} note={note}/> //key sab ki alag honi chahiye. to key de raha hu
        })}

    </div>
    </>
  )
}

export default Notes
