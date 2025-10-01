import React, { useState } from "react";
import { assets } from "../../public/assets";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate() // true -> Sign Up, false -> Sign In

  return (
    <div className="bg-[url('/bg_img.png')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center px-4 relative">
      {/* Logo Top Left */}
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="h-12 absolute top-6 left-6"
      />

      {/* Login Box */}
      <div className="bg-white shadow-xl w-full max-w-md p-8 rounded-xl">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          {isSignUp ? "Create Your Account" : "Login to Your Account"}
        </h2>

        <form className="space-y-4">
          {/* Username (Only for Sign Up) */}
          {isSignUp && (
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <img src={assets.person_icon} alt="user" className="w-5 h-5 mr-2" />
              <input
                type="text"
                placeholder="Enter Your Name"
                name="name"
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>
          )}

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <img src={assets.mail_icon} alt="mail" className="w-5 h-5 mr-2" />
            <input
              type="email"
              placeholder="Enter Your E-mail"
              name="email"
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <img src={assets.lock_icon} alt="lock" className="w-5 h-5 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              name="password"
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

          {/* Forgot Password (Only for Login) */}
          {!isSignUp && (
            <p onClick={()=>navigate('/resetPassword')} className="text-left text-sm text-gray-500 hover:text-gray-900 cursor-pointer">
              Forgot Password?
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-4 text-sm">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="underline hover:text-gray-900"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
