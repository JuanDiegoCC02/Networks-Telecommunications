import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function NavPage() {
    const navigate = useNavigate ()
  return (
    <div>

        <nav className='navContainerFull'>
            <div className='navContainerOwn'>
                <a className='accessNav' href="register">Register</a>
            </div>
            <div className='navContainerOwn'>
                <a className='accessNav' href="/logIn">Log In</a>
            </div>
            <div className='navContainerOwn'>
                <a className='accessNav' href="/">Home</a>
            </div>
             <div className='navContainerOwn'>
                <a className='accessNav' href="/cameras">Cameras</a>
            </div>
            <div className='navContainerOwn'>
                <a className='accessNav' href="/routers">Routers</a>
            </div>

        </nav>

    </div>
  )
}

export default NavPage