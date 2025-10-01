import React, { useState } from "react";
import { assets } from "../../public/assets";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-[url('/bg_img.png')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center px-4 relative">
      {/* Logo Top Left */}
      <img
        src={assets.logo}
        alt="Logo"
        className="h-12 absolute top-6 left-6"
      />

      {/* Login Box */}
      <div className="bg-white shadow-xl  w-full max-w-md p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Login Your Account
        </h2>

        <form className="space-y-4">
          {/* Username */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <img src={assets.person_icon} alt="user" className="w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <img src={assets.mail_icon} alt="mail" className="w-5 h-5 mr-2" />
            <input
              type="email"
              placeholder="Enter Your E-mail"
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <img src={assets.lock_icon} alt="lock" className="w-5 h-5 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-4 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="underline hover:text-white">
            Sign Up
          </a>
        </p>
      </div>
    </div>

  );
};

export default LoginPage;
