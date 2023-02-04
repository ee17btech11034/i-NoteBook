import React, {useContext, useEffect} from 'react'
import NoteContext from '../contexts/notes/NoteContext'

const About = () => {
    const a = useContext(NoteContext)
    useEffect(()=>{
        a.UpdateState()
        // eslint-disable-next-line
    }, [])
  return (
    <div>
      {a.state.name} is a great name with nikname {a.state.nikname} and time is: {a.state.time}.
    </div>
  )
}

export default About
