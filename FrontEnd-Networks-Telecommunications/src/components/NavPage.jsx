import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom' 
import "../styles/NavPage.css"

function NavPage() {
    const location = useLocation()
    
    const [group, setGroup] = useState(() => {
        return localStorage.getItem("groupUser")
    })

    useEffect(() => {
        const storedGroup = localStorage.getItem("groupUser")
        setGroup(storedGroup)
    }, [location])

    return (
        <div>
            <nav className='navContainerFull'>
                <div className='navContainerOwn'>
                    <Link className='accessNav' to="/">Home</Link>
                </div>

                {group && (
                    <>
                        <div className='navContainerOwn'>
                            <Link className='accessNav' to="/cameras">Cameras</Link>
                        </div>
                        <div className='navContainerOwn'>
                            <Link className='accessNav' to="/routers">Routers</Link>
                        </div>
                       
                    </>
                )}

            
            {group === "Administrator" && (
                <>
                 <div className='navContainerOwn'>
                    <Link className='accessNav' to="/administration">Administrator</Link>
                 </div>
                </>
            )}

                {!group && (
                    <>
                        <div className='navContainerOwn'>
                            <Link className='accessNav' to="/register">Register</Link>
                        </div>
                        <div className='navContainerOwn'>
                            <Link className='accessNav' to="/logIn">Log In</Link>
                        </div>
                    </>
                )}
            </nav>
        </div>
    )
}

export default NavPage