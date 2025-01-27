import React,{useState,useEffect} from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };



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




  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            IF Portal
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem("token") && <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dashboard
                </a>
                <ul class="dropdown-menu">
                  
                  <li>
                    <Link to='/form' class="dropdown-item">
                      Application Form
                    </Link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <Link class="dropdown-item" to="#">
                      Internships Applied
                    </Link>
                  </li>
                </ul>
              </li>}
            </ul>
            {localStorage.getItem("token") && userDetails && <div className="text-light mx-2">
              Hi {userDetails.name}
            </div>}
            {!localStorage.getItem("token") ? (
              <div>
                <Link to="/signup">
                  <button type="button" className="btn btn-light mx-1">
                    SignUp
                  </button>
                </Link>
                <Link to="/login">
                  <button type="button" className="btn btn-light mx-1">
                    Login
                  </button>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                type="button"
                className="btn btn-light mx-1"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
