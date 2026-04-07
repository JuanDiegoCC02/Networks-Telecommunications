import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import "../styles/NavPage.css"

function NavPage() {
    const navigate = useNavigate()
    const location = useLocation() // Escuchamos cambios en la URL
    
    const [group, setGroup] = useState(null)

    useEffect(() => {
        const storedGroup = localStorage.getItem("groupUser")
        setGroup(storedGroup)
    }, [location]) // Se ejecuta cada vez que navegamos

    return (
        <div>
            <nav className='navContainerFull'>
                <div className='navContainerOwn'>
                    <a className='accessNav' href="/">Home</a>
                </div>

                {group && (
                    <>
                        <div className='navContainerOwn'>
                            <a className='accessNav' href="/cameras">Cameras</a>
                        </div>
                        <div className='navContainerOwn'>
                            <a className='accessNav' href="/routers">Routers</a>
                        </div>
                         <div className='navContainerOwn'>
                            <a className='accessNav' href="/administration">Admin</a>
                        </div>
                    </>
                )}

                {!group && (
                <>
                 <div className='navContainerOwn'>
                    <a className='accessNav' href="/register">Register</a>
                 </div>
                 <div className='navContainerOwn'>
                    <a className='accessNav' href="/logIn">Log In</a>
                 </div>
                </>
                )}
             
            </nav>
        </div>
    )
}

export default NavPage