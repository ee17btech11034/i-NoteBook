import React, {useContext, useEffect, useRef, useState} from 'react'
import NoteContext from '../contexts/notes/NoteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

const Notes = () => {
  const context = useContext(NoteContext)
  const {notes, getallnotes} = context
  const ref = useRef(null)
  const [note, setNote] = useState({title:"", description:"", tag:""})

  useEffect(()=>{
    getallnotes()
    // eslint-disable-next-line
  }, [])

  const OnclickSubmit = (e)=>{
    e.preventDefault();  //aisa krne se jab bhi submit hoga page reload nhi hoga. 
  }
  const OnChange = (e)=>{
    setNote({...note, [e.target.name]:e.target.value}) // iska matlab hai ki pahle note me jo bhi hai unko lo and then unke name ke anusar unki values ko update kr do.
  }
  const updatenote = (note)=>{
    // ref.current.focus()
    ref.current.click()
  }
  return (
    <>
    <AddNote/>

    <button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Launch static backdrop modal</button>

    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Update Note</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" name="title" id="title" onChange={OnChange}/>
              </div>
              <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" name="description" id="description" onChange={OnChange}/>
              </div>
              <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" name="tag" id="tag" onChange={OnChange}/>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={OnclickSubmit}>Update Note</button>
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
