import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PostUsers } from '../services/hooksUsers'



function registerForm() {
  
  const [UserName, setUserName] = useState ("")
  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")
  const [Password, setPassword] = useState("")
  const [Email, setEmail] = useState("")
  const [Birthday, setBirthday] = useState("")
  const [Phone, setPhone] = useState("")

     const navigate = useNavigate();

  function username(e) {
    setUserName(e.target.value)
  }
  function firstname(e) {
    setFirstName(e.target.value)
  }
  function lastname(e) {
    setLastName(e.target.value)    
  }
  function password(e) {
    setPassword(e.target.value)
  }
  function email(e) {
    setEmail(e.target.value)
  }
  function birthday(e) {
    setBirthday(e.target.value)
  }
  function phone(e) {
    setPhone(e.target.value)
  }

     async function register() {

      console.log("UserName:", UserName)
      console.log("FirstName:", FirstName)
      console.log("LastName:", LastName)
      console.log("Password:", Password)
      console.log("Email:", Email)
      console.log("Birthday:", Birthday)
      console.log("Phone:", Phone)

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

      const requestServer = await PostUsers(obj);

      console.log("Usuario registrado:", requestServer);

      alert("User created successfully");

      navigate("/logIn");

  } catch (error) {

      console.error("Error al registrar:", error);

      alert("Error creating user");

  }
}

  return (
       <div>

      <div><h1>Register</h1></div>
      <div>
        <div>
          <label htmlFor="">Username</label>
          <input placeholder='Username' value={UserName} onChange={username} type="text" />
        </div>
        <div>
          <label htmlFor="">Firstname</label>
          <input placeholder='Firstname' value={FirstName} onChange={firstname} type="text" />
        </div>
        <div>
          <label htmlFor="">Lastname</label>
          <input placeholder='Lastname' value={LastName} onChange={lastname} type="text" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input placeholder='Password' value={Password} onChange={password} type="password" />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input placeholder='Email' value={Email} onChange={email} type="text" />
        </div>
        <div>
          <label htmlFor="">Birthday</label>
          <input placeholder='Birthday' value={Birthday} onChange={birthday} type="date" />
        </div>
        <div>
          <label htmlFor="">Phone</label>
          <input placeholder='Phone' value={Phone} onChange={phone} type="number" />
        </div>
      </div>

      <div>
        <button onClick={register} value= "Register" >Register</button>
      </div>

    </div>
  )
}

export default registerForm