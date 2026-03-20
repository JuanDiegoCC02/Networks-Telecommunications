import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postUsers } from '../services/usersApi'



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

      const requestServer = await postUsers(obj);

      console.log("Usuario registrado:", requestServer);

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
          <label className='registerLabelForm' htmlFor="">Username</label>
          <input className='registerInputForm' placeholder='Username' value={UserName} onChange={username} type="text" />
        </div>

        <div className='registerContainerForm'>
          <label className='registerLabelForm' htmlFor="">Firstname</label>
          <input className='registerInputForm' placeholder='Firstname' value={FirstName} onChange={firstname} type="text" />
        </div>

        <div className='registerContainerForm'>
          <label className='registerLabelForm' htmlFor="">Lastname</label>
          <input className='registerInputForm' placeholder='Lastname' value={LastName} onChange={lastname} type="text" />
        </div>

        <div className='registerContainerForm'>
          <label className='registerLabelForm' htmlFor="">Password</label>
          <input className='registerInputForm' placeholder='Password' value={Password} onChange={password} type="password" />
        </div>

        <div className='registerContainerForm'>
          <label className='registerLabelForm' htmlFor="">Email</label>
          <input className='registerInputForm' placeholder='Email' value={Email} onChange={email} type="text" />
        </div>

        <div className='registerContainerForm'>
          <label className='registerLabelForm' htmlFor="">Birthday</label>
          <input className='registerInputForm' placeholder='Birthday' value={Birthday} onChange={birthday} type="date" />
        </div>

        <div className='registerContainerForm'>
          <label className='registerLabelForm' htmlFor="">Phone</label>
          <input className='registerInputForm' placeholder='Phone' value={Phone} onChange={phone} type="number" />
        </div>
        
        <div className='registerContainerBttn'>
          <button className='registerBttnAccess' onClick={register} value= "Register" >Register</button>
       </div>

      </div>

    </div>
  )
}

export default registerForm