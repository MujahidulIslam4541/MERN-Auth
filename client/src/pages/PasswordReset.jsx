import React, { useContext, useRef, useState } from 'react'
import { assets } from '../../public/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { AppContent } from '../context/AppContent'
import toast from 'react-hot-toast'

const PasswordReset = () => {
  const navigate = useNavigate()
  const inputRef = useRef([])
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)


  const [isEmailSend, setIsEmailSend] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(0)

  axios.defaults.withCredentials = true;
  const { backendUrl } = useContext(AppContent)

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


  // handle email submitted
  const onsubmitEmail = async (e) => {
    try {
      e.preventDefault()
      const { data } = await axios.post(backendUrl + '/api/auth/reset-otp-send', { email })

      if (data.success) {
        toast.success(data.message)
        setIsEmailSend(true)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // otp submitted
  const onsubmitOtp = async (e) => {
    e.preventDefault()
    const ArrayOtp = inputRef.current.map(e => e.value)
    setOtp(ArrayOtp.join(''))
    setIsOtpSubmitted(true)
  }

  // submit new password
  const onSubmitNewPassword = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword })

      if (data.success) {
        toast.success(data.message)
        navigate('/login')
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="bg-[url('/bg_img.png')] bg-cover bg-center min-h-screen relative">
      {/* Navbar Logo */}
      <div className="absolute top-4 left-4">
        <img
          src={assets.logo}
          alt="Logo"
          className="h-12 cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>

      <div className="flex items-center justify-center min-h-screen px-4">
        {/* email fields */}
        {!isEmailSend && <form onSubmit={onsubmitEmail} className="bg-gray-900 text-white rounded-xl shadow-xl w-full max-w-md p-8">
          {/* Heading */}
          <h2 className="text-center text-2xl font-semibold mb-4">
            Reset Password
          </h2>
          <p className="text-center text-gray-300 mb-6">
            Please Enter Your Registered Email Address
          </p>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <img src={assets.mail_icon} alt="mail" className="w-5 h-5 mr-2" />
            <input
              type="email"
              placeholder="Enter Your E-mail"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700 " 
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-white font-semibold transition"
          >
            Verify Email
          </button>
        </form>}

        {/* otp fields */}
        {!isOtpSubmitted && isEmailSend &&
          <form onSubmit={onsubmitOtp} className="bg-gray-900 text-white rounded-xl shadow-xl w-full max-w-md p-8">
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
                  required
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
              Submit
            </button>
          </form>
        }


        {/* new password */}
        {isOtpSubmitted && isEmailSend &&
          <div className="flex items-center justify-center min-h-screen px-4">
            <form onSubmit={onSubmitNewPassword} className="bg-gray-900 text-white rounded-xl shadow-xl w-full max-w-md p-8">

              {/* Heading */}

              <h2 className="text-center text-2xl font-semibold mb-4">
                Enter New Password
              </h2>
              <p className="text-center text-gray-300 mb-6">
                Please enter  your new password
              </p>

              {/* new password Fields */}
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <img src={assets.lock_icon} alt="lock" className="w-5 h-5 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your New Password"
                  name="password"
                  value={newPassword}
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-600 ml-2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Submit Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 mt-6 rounded-lg text-white font-semibold transition">
                Submit
              </button>
            </form>
          </div>
        }
      </div>
    </div>
  )
}

export default PasswordReset
