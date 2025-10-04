import { useContext, useEffect, useRef } from 'react'
import { assets } from '../../public/assets'
import { AppContent } from '../context/AppContent'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import { useEffect } from 'react'

const EmailVerification = () => {
    const navigate = useNavigate()
    const inputRef = useRef([])
    axios.defaults.withCredentials = true;
    const { backendUrl, getUserData, userData } = useContext(AppContent)
    // userData, isLoggedIn 
    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
            inputRef.current[index + 1].focus()
        }
    }
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value == '' && index > 0) {
            inputRef.current[index - 1].focus()
        }
    }

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text')
        const pasteArray = paste.split('')
        pasteArray.forEach((char, index) => {
            if (inputRef.current[index]) {
                inputRef.current[index].value = char;
            }
        });
    }

    const handleVerifyOtp = async (e) => {
        try {
            e.preventDefault()
            const otpArray = inputRef.current.map(e => e.value)
            const otp = otpArray.join('')

            const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp })

            if (data.success) {
                toast.success(data.message)
                getUserData()
                navigate('/')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (userData?.isAccountVerified) {
            navigate('/');
        }
    }, [userData]);


    return (
        <div className=" bg-cover bg-center min-h-screen relative">

            {/* Navbar Logo */}
            <div className="absolute top-4 left-4">
                <img src={assets.logo} alt="Logo" className="h-12" onClick={navigate('/')} />
            </div>

            {/* Centered OTP Card */}
            <div className="flex items-center justify-center min-h-screen px-4">
                <form onSubmit={handleVerifyOtp} className="bg-gray-900 text-white rounded-xl shadow-xl w-full max-w-md p-8">

                    {/* Heading */}
                    <h2 className="text-center text-2xl font-semibold mb-4">
                        Enter Your 6-Digit OTP
                    </h2>
                    <p className="text-center text-gray-300 mb-6">
                        Please enter the OTP sent to your email address
                    </p>

                    {/* OTP Fields */}
                    <div className="flex justify-between mb-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                className="w-12 h-12 text-center text-gray-900 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ref={event => inputRef.current[index] = event}
                                onInput={(e) => handleInput(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                            />
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-white font-semibold transition">
                        Verify Email
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EmailVerification
