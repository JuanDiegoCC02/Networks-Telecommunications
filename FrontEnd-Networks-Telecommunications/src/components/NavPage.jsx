import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom' 
import "../styles/NavPage.css"

function NavPage() {
    const navigate = useNavigate()
    const location = useLocation() 
    
    const [group, setGroup] = useState(() => {
        return localStorage.getItem("groupUser")
    })

    const [showConfig, setShowConfig] = useState(false)

    useEffect(() => {
        const storedGroup = localStorage.getItem("groupUser")
        setGroup(storedGroup)
    }, [location])

    const handleLogout = () => {
        localStorage.clear()
        setGroup(null)
        setShowConfig(false)
        navigate("/logIn")
    }

    return (
        <div>
            <nav className='navContainerFull'>
                <div className='navContainerOwn'>
                    <Link className='accessNav' to="/">Home</Link>
                </div>
                 <div className='navContainerOwn'>
                    <Link className='accessNav' to="/contactUs">Contact Us</Link>
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
            {group && (
                <>
                <div>
                    <button onClick={setShowConfig} className=''>
                        Config
                    </button>

                    {showConfig && (
                        <div className=''>
                           <div className=''>
                            <Link to="/myProfile" onClick={() => setShowConfig(false)} className=''>
                                My Profile
                            </Link>
                           </div>

                           <div className=''>
                            <button onClick={handleLogout} className=''>
                                Log out
                            </button>
                           </div>
                          </div>
                    )}

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