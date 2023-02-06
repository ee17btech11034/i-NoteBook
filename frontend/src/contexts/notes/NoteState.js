import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props)=>{
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
    
    // const UpdateState = ()=>{
    //     setTimeout(()=>{
    //         setState({
    //             "name": "Raja",
    //             "nik-name": "AR",
    //             "time": state.time +1
    //         })
    //     }, 1000)
    // }
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;