import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../styles/LogInForm.css";

function LogInForm() {
    const [loginAccess, setLoginAccess] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [, setCookie] = useCookies(["username", "id", "groupUser", "access_token"]);

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: loginAccess, password: password })
            });

            const data = await response.json();

            if (response.ok) {
                const cookieOptions = { path: "/", maxAge: 3600, sameSite: 'lax' };
                setCookie("access_token", data.access, cookieOptions);
                setCookie("username", data.username, cookieOptions);
                setCookie("id", data.id, cookieOptions);
                setCookie("groupUser", data.group, cookieOptions);

                localStorage.clear(); 
                navigate("/");
            } else {
                alert("Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Could not connect to the server.");
        }
    };

    return (
        <div className="logInContainerFull">
            <div className="logInContainerTitle">
                <h2 className="logInTitle">Log In</h2>
            </div>
            <div className="logInFormFull">
                <div className="logInContainerForm">
                    <label className="logInLabelForm">Username or Email</label>
                    <input 
                        className="logInInputForm" 
                        type="text" 
                        placeholder="Username" 
                        value={loginAccess} 
                        onChange={(e) => setLoginAccess(e.target.value)}
                    />
                </div>
                <div className="logInContainerForm">
                    <label className="logInLabelForm">Password</label>
                    <input 
                        className="logInInputForm" 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="logInContianerBttn">
                    <button className="logInBttnAccess" onClick={handleLogin}>Log In</button>
                </div>
                <div className="logInContainerLinkRegister">
                    <span className="logInTitleLinkRegister">Don't have an account?</span>
                    <Link className="logInLinkRegister" to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default LogInForm; 