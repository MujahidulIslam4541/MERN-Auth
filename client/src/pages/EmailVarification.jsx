import React from 'react'
import { assets } from '../../public/assets'

const EmailVerification = () => {
    return (
        <div className="bg-[url('/bg_img.png')] bg-cover bg-center min-h-screen relative">

            {/* Navbar Logo */}
            <div className="absolute top-4 left-4">
                <img src={assets.logo} alt="Logo" className="h-12" />
            </div>

            {/* Centered OTP Card */}
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="bg-gray-900 text-white rounded-xl shadow-xl w-full max-w-md p-8">

                    {/* Heading */}
                    <h2 className="text-center text-2xl font-semibold mb-4">
                        Enter Your 6-Digit OTP
                    </h2>
                    <p className="text-center text-gray-300 mb-6">
                        Please enter the OTP sent to your email address
                    </p>

                    {/* Email Input */}
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="w-full px-4 py-2 rounded-lg border mb-6"
                    />

                    {/* OTP Fields */}
                    <div className="flex justify-between mb-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                className="w-12 h-12 text-center text-gray-900 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-white font-semibold transition">
                        Verify OTP
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmailVerification
