import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'

const Login = () => {
  const [credentials, setCredentials] = useState({email:"", password:""})
  const navigate = useNavigate() 
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/login"
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({email:credentials.email, password:credentials.password}) // body data type must match "Content-Type" header
    });
    const json = await response.json()
    if (json.success){ //agar password and email sahi hai to 
      //authtoken ko local storage me save kro and fir notes par redirect kr do. 
      localStorage.setItem('token', json.authToken)
      navigate('/')
    }
    else{
      alert("Enter correct credentials")
    }
  }

  const Onchange = (e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }
  return (
    <div className='container my-3'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" name="email" values={credentials.email} id="email" onChange={Onchange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" values={credentials.password} id="password" onChange={Onchange}/>
        </div>
        {/* <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>Submit</button> */} {/*Button par on Submit nhi lagta for m par lagta hai  */}
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login
