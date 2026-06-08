import React from 'react'

function ModalTechnicalProfile() {


  return (
    <div>
        <h2>Technical Profile</h2>
         
         
          <p>Username: {myUser.username}</p>
          <p>Name: {myUser.first_name} {myUser.last_name}</p>
          <p>Email: {myUser.email}</p>
          <p>Birth Date: {myUser.birth_date}</p>
          <p>Phone Number: {myUser.phone_number}</p>
          
    </div>


    
  )
}

export default ModalTechnicalProfile
