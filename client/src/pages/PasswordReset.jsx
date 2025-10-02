import React, { useState } from 'react'
import { assets } from '../../public/assets'
import { useNavigate } from 'react-router-dom'

const PasswordReset = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

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
        <form className="bg-gray-900 text-white rounded-xl shadow-xl w-full max-w-md p-8">
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
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700 "required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-white font-semibold transition"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  )
}

export default PasswordReset
