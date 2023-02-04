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
// import LoadingBar from 'react-top-loading-bar'


const App = ()=> {
  
  return (
      <div>
          <BrowserRouter>   
              <Navbar />
              <Routes>
                <Route exact path="/" element = {<Home/>}/>                
                <Route exact path="/about" element = {<About/>}/>                
              </Routes>
          </BrowserRouter>
      </div>
    )
}

export default App;
