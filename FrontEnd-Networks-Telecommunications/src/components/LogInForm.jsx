  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { useCookies } from "react-cookie";
  import"../styles/LogInForm.css"

  function LogInForm() {

    const [LogInAccess, setLogInAccess] = useState("");
    const [Password, setPassword] = useState("");

    const navigate = useNavigate();

    // Manejo de cookies
    const [cookies, setCookie] = useCookies(["username", "id", "groupUser"]);
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

         //  Save data in cookies 
        setCookie("username", data.username, { path: "/", maxAge: 3600 });
        setCookie("id", data.id, { path: "/", maxAge: 3600 });
        setCookie("groupUser", data.group, { path: "/", maxAge: 3600 });

        //  Save data in localStorage
        localStorage.setItem("username", data.username);
        localStorage.setItem("id", data.id);
        localStorage.setItem("groupUser", data.group); 

        console.log("Access approved", data.group);
          navigate("/");

        } else {
           console.error("Error: invalid credentials", data.message|| "Unknown error");
        alert("Credenciales incorrectas");
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
          <label className="logInLabelForm"> Username or Email </label>
          <input className="logInInputForm" type="text" placeholder="Username or Email" value={LogInAccess} onChange={(e) => setLogInAccess(e.target.value)}/>
        </div>

        <br/>

        <div className="logInContainerForm">
          <label className="logInLabelForm"> Password </label>
          <input className="logInInputForm" type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <br/>
      
        <div className="logInContianerBttn">
        <button className="logInBttnAccess" onClick={accessLogIn}> Log In </button>
        </div>

        <div className="logInContainerLinkRegister">
          <label className="logInTitleLinkRegister" htmlFor="">Create Account</label>
          <a className="logInLinkRegister" href="/register">Register</a>
        </div>

        </div>

      </div>
    );
  }

  export default LogInForm;