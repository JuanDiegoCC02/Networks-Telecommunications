import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'; 
import "../styles/NavPage.css";

function NavPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [cookies, removeCookie] = useCookies(['groupUser', 'access_token']);
    const [showConfig, setShowConfig] = useState(false);

    const group = cookies.groupUser;

    useEffect(() => {
        setShowConfig(false);
    }, [location]);

    const handleLogout = () => {
        const options = { path: '/' };

        removeCookie('access_token', options);
        removeCookie('groupUser', options);
        removeCookie('username', options);
        removeCookie('id', options);

        localStorage.clear();

        setShowConfig(false);
        navigate("/logIn");
        window.location.reload(); 
    };

    return (
        <nav className='navContainerFull'>
            {/* public access */}
            <div className='navContainerOwn'>
                <Link className='accessNav' to="/">Home</Link>
            </div>
            <div className='navContainerOwn'>
                <Link className='accessNav' to="/contactUs">Contact Us</Link>
            </div>

            {/* users */}
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

            {/* administrator */}
            {group === "Administrator" && (
                <div className='navContainerOwn'>
                    <Link className='accessNav' to="/adminNetworks">Admin Networks</Link>
                </div>
            )}

            {/* configuration */}
            {group ? (
                <div className='navContainerOwn configWrapper'>
                    <button 
                        onClick={() => setShowConfig(!showConfig)} 
                        className='accessNav btnConfig'
                    >
                        Config
                    </button>

                    {showConfig && (
                        <div className='configDropdown'>
                            <Link to="/myProfile" className='dropdownItem'>
                                My Profile
                            </Link>
                            <button onClick={handleLogout} className='dropdownItem btnLogout'>
                                Log out
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                /* without group */
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
    );
}

export default NavPage;