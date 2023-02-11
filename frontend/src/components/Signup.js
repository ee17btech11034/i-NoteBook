import React, {useState} from 'react'

const Signup = () => {
    const [credentials, setCredentials] = useState({username: "", newemail:"", newpassword:""})
    const handleSubmit = async(e)=>{
      e.preventDefault();
      const url = "http://localhost:5000/api/auth/createuser" 
      const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({name: credentials.username, email:credentials.newemail, password:credentials.newpassword}) // body data type must match "Content-Type" header
      });
      const json = response.json()
      console.log(json)
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
          {/* <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>Submit</button> */} {/*Button par on Submit nhi lagta for m par lagta hai  */}
          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
      </div>
    )
  }

export default Signup
