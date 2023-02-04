import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props)=>{
    const s1 = {
        "name": "Raja",
        "nikname": "AR",
        "time": 0
    }
    const [state, setState] = useState(s1) 
    
    const UpdateState = ()=>{
        setTimeout(()=>{
            setState({
                "name": "Raja",
                "nik-name": "AR",
                "time": state.time +1
            })
        }, 1000)
    }
    return (
        <NoteContext.Provider value={{state, UpdateState}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;