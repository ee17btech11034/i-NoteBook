import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom'


const Signup = () => {
    const [credentials, setCredentials] = useState({username: "", newemail:"", newpassword:"", cnewpassword:""})
    const [username, newemail, newpassword, cnewpassword ] = credentials; //me destructuring bhi use kr skta hu.
    const navigate = useNavigate() 

    const handleSubmit = async(e)=>{
      e.preventDefault();
      const url = "http://localhost:5000/api/auth/createuser" 
      if (newpassword !== cnewpassword){
        alert("Oops! passwaord and confirm password must be same.")
        return 
      }
      const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({username, newemail, newpassword}) // body data type must match "Content-Type" header
      });
      const json = response.json()
      if (json.success){ //agar user already nhi hai present to
        //authtoken ko local storage me save kro and fir notes par redirect kr do. 
        localStorage.setItem('token', json.authToken)
        navigate('/')
      }
      else{
        alert("User already present ")
      }
    }
  
    const Onchange = (e)=>{
      setCredentials({...credentials, [e.target.name]:e.target.value})
    }
    return (
      <div className='container my-3'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="username" className="form-label">Name</label>
              <input type="username" className="form-control" name="username" values={credentials.username} id="username" onChange={Onchange} aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
              <label htmlFor="newemail" className="form-label">Email</label>
              <input type="email" className="form-control" name="newemail" values={credentials.newemail} id="newemail" onChange={Onchange} aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
              <label htmlFor="newpassword" className="form-label">Password</label>
              <input type="password" className="form-control" name="newpassword" values={credentials.newpassword} id="newpassword" onChange={Onchange}/>
          </div>
          <div className="mb-3">
              <label htmlFor="cnewpassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" name="cnewpassword" values={credentials.newpassword} id="cnewpassword" onChange={Onchange}/>
          </div>
          {/* <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>Submit</button> */} {/*Button par on Submit nhi lagta for m par lagta hai  */}
          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
      </div>
    )
  }

export default Signup
