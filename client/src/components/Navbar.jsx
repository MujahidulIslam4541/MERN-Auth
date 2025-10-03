import  { useContext } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../public/assets'
import { AppContent } from '../context/AppContent'
import toast from 'react-hot-toast'
import axios from 'axios'

const Navbar = () => {
    const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContent)
    // const navigate = useNavigate()
    console.log(userData)


    // const sendVerificationOtp = async () => {
    //     try {
    //         axios.defaults.withCredentials = true;

    //         const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp')
    //         if (data.success) {
    //             navigate('/emailVerification')
    //             toast.success(data.message)
    //         }
    //         else {
    //             toast.error(data.error)
    //         }
    //     } catch (error) {
    //         toast.error(error.message)
    //     }
    // }


    const logOut = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/logOut')
            data.success && setIsLoggedIn(false)
            data.success && setUserData(false)
            data.success && toast.success("user logged out")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div>
            <div className="navbar  px-4">
                {/* Left side */}
                <div className="flex-1">
                    <img src={assets.logo} alt="Logo" className="h-10" />
                </div>

                {/* Right side */}
                {userData
                    ?
                    <div className="relative inline-block group">
                        {/* Avatar */}
                        <p className="bg-gray-900 text-white w-10 h-10 flex items-center justify-center rounded-full font-semibold text-lg cursor-pointer">
                            {userData?.name[0]?.toUpperCase()}
                        </p>

                        {/* Dropdown Menu */}
                        <div className="absolute top-12 right-0 w-40 bg-white shadow-lg rounded-xl py-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* User Name */}
                            <p className="px-4 py-1 font-semibold text-gray-800 truncate">
                                {userData?.name}
                            </p>

                            {/* Email Verification */}
                            {/* {!userData?.isAccountVerified && (
                                <button
                                onClick={sendVerificationOtp}
                                    className="w-full text-left px-4 py-1 text-sm text-blue-600 hover:bg-gray-100"
                                >
                                    Verify Email
                                </button>
                            )} */}

                            {/* Logout */}
                            <button
                                onClick={logOut}
                                className="w-full text-left px-4 py-1 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                    :
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
                    </div>}
            </div>

        </div>
    )
}

export default Navbar
