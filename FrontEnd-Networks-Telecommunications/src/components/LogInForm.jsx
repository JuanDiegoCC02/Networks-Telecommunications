  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { useCookies } from "react-cookie";

  function LogInForm() {

    const [Username, setUsername] = useState("");
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
            username: Username,
            password: Password
          })
        });

        if (response.ok) {

          // Save username in cookies
          setCookie("username", Username, {
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
      <div style={{textAlign:"center", marginTop:"50px"}}>

        <h2>Log In</h2>

        <div>
          <label> Username </label><br/>
          <input type="text" placeholder="" value={Username} onChange={(e) => setUsername(e.target.value)}/>
        </div>

        <br/>

        <div>
          <label> Password </label><br/>
          <input type="password" placeholder="" value={Password} onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <br/>

        <button onClick={accessLogIn}> Log In </button>


      </div>
    );
  }

  export default LogInForm;