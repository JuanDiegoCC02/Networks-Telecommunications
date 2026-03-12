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

        // Validación para que todos los espacios deban completarse antes de poder enviar el formulario
         if (!UserName || !FirstName || !LastName || !Password || !Email || !Birthday || !Phone) {
            return;
        }

      
        const obj = {
            username: UserName,
            firstname: FirstName,
            lastname: LastName,
            password: Password,
            email: Email,
            birthday: Birthday,
            phone: Phone
        }
    try { // POST para crear el usuario
        const requestServer = await PostUsers(obj);
        console.log("Usuario registrado:", requestServer);
        navigate("/logIn");
    } catch (error) {
    console.error("Error al registrar:", error);

    // Verifica si viene un msj
    if (error.response && error.response.data) {
        const data = error.response.data;

        if (data.error) {
           console.log("Failed backend")
        } else {
            console.log("failed data")
        }
        } else {
           console.log("failed")
        }
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
          <input placeholder='Password' value={Password} onChange={password} type="text" />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input placeholder='Email' value={Email} onChange={email} type="text" />
        </div>
        <div>
          <label htmlFor="">Birthday</label>
          <input placeholder='Birthday' value={Birthday} onChange={birthday} type="text" />
        </div>
        <div>
          <label htmlFor="">Phone</label>
          <input placeholder='Phone' value={Phone} onChange={phone} type="text" />
        </div>
      </div>

      <div>
        <input type="button" onClick={register} value= "Register" />
      </div>

    </div>
  )
}

export default registerForm