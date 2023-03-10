import React, {useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Navbar = () => {
    let location = useLocation();
    const navigate = useNavigate() 
    useEffect(()=>{
        console.log(location) //navbar me jis par bhi click krunga usko track krke location batayega
        console.log(location.pathname) //ye uska pathname batayega like /, /about, etc..
    }, [location])
  const logoutclick = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">iNoteBook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item">
                    {/* <Link className="nav-link active" aria-current="page" to="/">Home</Link> */}
                    <Link className={`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">Home</Link>
                </li>
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/mynotes">My Notes</Link>
                </li> */}
               
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="/mynotes" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    My Notes
                </Link>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="#">My private Notes</Link></li>
                    <li><Link className="dropdown-item" to="#">My public Notes</Link></li>
                </ul>
                </li>
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="mytodo" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    My To-Do List
                </Link>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="#">My private todo list</Link></li>
                    <li><Link className="dropdown-item" to="#">My public todo list</Link></li>
                </ul>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/allnotes">Public Notes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/allnotes">Public Todo list</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                </li>

                {!localStorage.getItem('token') ? <form className="d-flex mx-3" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success mx-2" type="submit">Search</button>
                    <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-2" to="/signup" role="button">SignUp</Link>
                </form> :
                <button className="btn btn-primary mx-4" onClick={logoutclick}>Log out</button>}
              </ul>
            </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
