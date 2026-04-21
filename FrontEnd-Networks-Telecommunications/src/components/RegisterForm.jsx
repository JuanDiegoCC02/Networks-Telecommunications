import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { postUsers } from '../services/usersApi'
import "../styles/RegisterForm.css"

function RegisterForm() {
    const [UserName, setUserName] = useState("")
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Password, setPassword] = useState("")
    const [Email, setEmail] = useState("")
    const [Birthday, setBirthday] = useState("")
    const [Phone, setPhone] = useState("")

    const navigate = useNavigate();

    async function register() {
        if (!UserName || !FirstName || !LastName || !Password || !Email || !Birthday || !Phone) {
            alert("Complete all fields");
            return;
        }

        const obj = {
            username: UserName,
            first_name: FirstName,
            last_name: LastName,
            password: Password,
            email: Email,
            birth_date: Birthday,
            phone_number: Phone
        }

        try {
            await postUsers(obj);
            alert("User created successfully");
            navigate("/logIn");
        } catch (error) {
            console.error("Error al registrar:", error);
            alert("Error creating user");
        }
    }

    return (
        <div className='registerContainerFull'>
            <div className='registerContainerTitle'>
                <h1 className='registerTitle'>Register</h1>
            </div>

            <div className='registerFormFull'>
                <div className='registerContainerForm'>
                    <label className='registerLabelForm'>Username</label>
                    <input className='registerInputForm' placeholder='Username' value={UserName} onChange={(e) => setUserName(e.target.value)} type="text" />
                </div>

                <div className='registerContainerForm'>
                    <label className='registerLabelForm'>Firstname</label>
                    <input className='registerInputForm' placeholder='Firstname' value={FirstName} onChange={(e) => setFirstName(e.target.value)} type="text" />
                </div>

                <div className='registerContainerForm'>
                    <label className='registerLabelForm'>Lastname</label>
                    <input className='registerInputForm' placeholder='Lastname' value={LastName} onChange={(e) => setLastName(e.target.value)} type="text" />
                </div>

                <div className='registerContainerForm'>
                    <label className='registerLabelForm'>Password</label>
                    <input className='registerInputForm' placeholder='Password' value={Password} onChange={(e) => setPassword(e.target.value)} type="password" />
                </div>

                <div className='registerContainerForm'>
                    <label className='registerLabelForm'>Email</label>
                    <input className='registerInputForm' placeholder='Email' value={Email} onChange={(e) => setEmail(e.target.value)} type="email" />
                </div>

                <div className='registerContainerForm'>
                    <label className='registerLabelForm'>Birthday</label>
                    <input className='registerInputForm' placeholder='Birthday' value={Birthday} onChange={(e) => setBirthday(e.target.value)} type="date" />
                </div>

                <div className='registerContainerForm'>
                    <label className='registerLabelForm'>Phone</label>
                    <input className='registerInputForm' placeholder='Phone' value={Phone} onChange={(e) => setPhone(e.target.value)} type="text" />
                </div>
                
                <div className='registerContainerBttn'>
                    <button className='registerBttnAccess' onClick={register}>Register</button>
                </div>
                
                <div className="registerContainerLinkLogIn">
                    <span className="registerTitleLinkLogIn">Already Registered?</span>
                    <Link className="registerLinkLogIn" to="/logIn">Log In</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;