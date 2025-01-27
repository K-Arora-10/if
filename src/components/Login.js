import React from "react";
import { useNavigate } from "react-router-dom";






const Login = () => {

    let navigate=useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
    
    
        const formData = {
            email: e.target.email.value, // access form input by "name" attribute
            password: e.target.password.value,
          };
    
    
        const response = await fetch("http://localhost:2000/auth/login",{
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(formData)
        });
        const json = await response.json();
        console.log(json)
        if(json.success)
        {
            localStorage.setItem('token',json.authtoken);
            navigate("/");
        }
    }







  return (
    <>
      <div className="container my-2">
        <div className="card">
          <div className="card-header">Login</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}> 
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                />
                
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
              </div>
             
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
