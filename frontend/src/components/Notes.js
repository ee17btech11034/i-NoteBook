import React, {useContext, useEffect, useRef} from 'react'
import NoteContext from '../contexts/notes/NoteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

const Notes = () => {
  const context = useContext(NoteContext)
  const {notes, getallnotes} = context
  const ref = useRef(null)
  useEffect(()=>{
    getallnotes()
    //elsint-disable-next-line
  }, [])

  const updatenote = (note_id)=>{
    ref.toggle()
  }
  return (
    <>
    <AddNote/>
    <button type="button" className="btn btn-primary" ref={ref} data-toggle="modal" data-target="#exampleModalCenter">
      </button>
    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
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
