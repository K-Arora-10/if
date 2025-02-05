import React from "react";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  // let navigate = useNavigate();

  // useEffect(() => {
    // Check if token is not present in localStorage, then redirect to login
  //   if (!localStorage.getItem("token")) {
  //     navigate("/login");
  //   }
  // }, [navigate]); // Empty dependency array ensures it runs once after the initial render

  return (
    <center>
      <div className="container mt-4">I am Home</div>
    </center>
  );
};

export default Home;
