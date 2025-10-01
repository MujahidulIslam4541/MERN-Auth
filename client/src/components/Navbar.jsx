import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../public/assets'

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm px-4">
                {/* Left side */}
                <div className="flex-1">
                    <img src={assets.logo} alt="Logo" className="h-10" />
                </div>

                {/* Right side */}
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link
                                to="/login"
                                className="flex items-center gap-2 border px-4 py-2 rounded-full"
                            >
                                Login
                                <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Navbar
