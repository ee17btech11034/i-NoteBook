import './App.css';
import React from 'react'
import { 
  BrowserRouter,
  Routes,
  Route, 
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './contexts/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
// import LoadingBar from 'react-top-loading-bar'


const App = ()=> {
  
  return (
      <>
      <NoteState>
          <BrowserRouter>   
              <Navbar />
              <Routes>
                <Route exact path="/" element = {<Home/>}/>                
                <Route exact path="/about" element = {<About/>}/>                
                <Route exact path="/login" element = {<Login/>}/>                
                <Route exact path="/signup" element = {<Signup/>}/>                
              </Routes>
          </BrowserRouter>
        </NoteState>
      </>
    )
}

export default App;
