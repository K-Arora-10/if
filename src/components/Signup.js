import React from 'react'




const Signup = () => {


    const handleSubmit = async (e)=>{
        e.preventDefault();
    
        const formData = {
            name: e.target.name.value, // access form input by "name" attribute
            email: e.target.email.value,
            password: e.target.password.value,
          };
    
    
        const response = await fetch("http://localhost:2000/auth/createUser",{
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(formData)
        });
        const json = await response.json();
        console.log(json);
        
        
    }



  return (
    <>
      <div className="container my-2">
        <div className="card">
          <div className="card-header">Signup</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}> 
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                 Name
                </label>
                <input
                 
                  className="form-control"
                  id="name"
                  name="name"
                  aria-describedby="emailHelp"
                />
                
              </div>
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
                  Set Password
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
  )
}

export default Signup
