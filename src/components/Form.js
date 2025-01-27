import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  let navigate = useNavigate();


  // Getting details of the logged in user

  const [userDetails, setUserDetails] = useState(null);  // State to store user details
 

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No token found in localStorage');
        }

        // Make the API call to get user details using the token
        const response = await fetch('http://localhost:2000/auth/getuser', {
          method: 'POST',
          headers: {
            'auth-token': `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        // Parse the response and update state with user data
        const data = await response.json();
        setUserDetails(data); 
        console.log(data) // Store user data in state
      } catch (err) {
        // Handle error and update state
        console.error('Error fetching user details:', err);
          // Store error message
      }
    };

    fetchUserDetails();
  }, []);


  //-----------------------------




  useEffect(() => {
    // Check if token is not present in localStorage, then redirect to login
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }
  }, [navigate]);

  const [selectedCompany, setSelectedCompany] = useState("");
  const [roles, setRoles] = useState([]);
//   const [resume, setResume] = useState(null);

  // Companies and their roles
  const companyRoles = {
    "Company A": ["Role 1", "Role 2", "Role 3"],
    "Company B": ["Role 4", "Role 5"],
    "Company C": ["Role 6", "Role 7", "Role 8"],
  };

  // Handle company selection
  const handleCompanyChange = (e) => {
    const company = e.target.value;
    setSelectedCompany(company);
    setRoles(companyRoles[company] || []);
  };

  // Handle file upload
//   const handleFileChange = (e) => {
//     setResume(e.target.files[0]);
//   };

  
    const handleSubmit = async (e)=>{
      e.preventDefault();
      
  
  
      const formData = {
          name: e.target.name.value, // access form input by "name" attribute
          email: e.target.email.value,
          phone: e.target.phone.value,
          company: e.target.company.value,
          role: e.target.role.value,
          resume: e.target.resume.value,
        };
  
  
      const response = await fetch("http://localhost:2000/form/fillForm",{
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
          alert("Application Submitted Successfully");
      }
  };
  

  return (
    <div className="container mt-3 mb-5">
      <h2 className="mb-4">Internship Application Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={userDetails?`${userDetails.name}`:""}
            disabled={userDetails}
            //placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={userDetails?`${userDetails.email}`:""}
            disabled={userDetails}
            //placeholder="Enter your email"
            required
          />
        </div>

        {/* Phone Field */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            //placeholder="Enter your phone number"
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
            required
          />
        </div>

        {/* Company Dropdown */}
        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Select Company:
          </label>
          <select
            id="company"
            name="company"
            className="form-select"
            value={selectedCompany}
            onChange={handleCompanyChange}
            required
          >
            <option value="">-- Select a Company --</option>
            {Object.keys(companyRoles).map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        {/* Role Dropdown */}
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Select Role:
          </label>
          <select
            id="role"
            name="role"
            className="form-select"
            disabled={!selectedCompany}
            required
          >
            <option value="">-- Select a Role --</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Resume Upload */}
        <div className="mb-3">
          <label htmlFor="resume" className="form-label">
            Resume Link : (Drive Link)
          </label>
          <input
            type="text"
            id="resume"
            name="resume"
            className="form-control"
            
            // onChange={handleFileChange}
            required
          />
        </div>
        

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default Form;
