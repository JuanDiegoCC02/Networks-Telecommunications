import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function NavPage() {
    const navigate = useNavigate
  return (
    <div>

        <nav>
            <div>
                <a href="register">Register</a>
            </div>
            <div>
                <a href="/logIn">Log In</a>
            </div>
            <div>
                <a href="/">Home</a>
            </div>
             <div>
                <a href="/cameras">Cameras</a>
            </div>

        </nav>

    </div>
  )
}

export default NavPage