  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { useCookies } from "react-cookie";

  function LogInForm() {

    const [LogInAccess, setLogInAccess] = useState("");
    const [Password, setPassword] = useState("");

    const navigate = useNavigate();

    // Manejo de cookies
    const [cookies, setCookie, removeCookie] = useCookies(["username"]);

    // button logic log in
    const accessLogIn = async () => {
      try {

        const response = await fetch("http://localhost:8000/api/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            loginAccess: LogInAccess,
            password: Password
          })
        });

        const data = await response.json();

        if (response.ok) {

          // Save username in cookies
          setCookie("username", data.username, {
            path: "/",
            maxAge: 3600
          });
          navigate("/");

        } else {
           console.error("Error: invalid credentials", error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };


    return (
      <div className="logInContainerFull">

        <div className="logInContainerTitle">
        <h2 className="logInTitle">Log In</h2>
        </div>


      <div className="logInFormFull">
        <div className="logInContainerForm">
          <label className="logInLabelForm"> Username or Email </label><br/>
          <input className="logInInputForm" type="text" placeholder="" value={LogInAccess} onChange={(e) => setLogInAccess(e.target.value)}/>
        </div>

        <br/>

        <div className="logInContainerForm">
          <label className="logInLabelForm"> Password </label><br/>
          <input className="logInInputForm" type="password" placeholder="" value={Password} onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <br/>
      
        <div className="logInContianerBttn">
        <button className="logInBttnAccess" onClick={accessLogIn}> Log In </button>
        </div>

        </div>

      </div>
    );
  }

  export default LogInForm;