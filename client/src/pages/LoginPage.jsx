import { useContext, useState } from "react";
import { assets } from "../../public/assets";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContent";
import toast from "react-hot-toast";
import axios from "axios";


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (isSignUp) {
        console.log("Sign Up Data:", { name, email, password });
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password })

        if (data.success) {
          setIsLoggedIn(true)
          toast.success("user registration success ")
          await getUserData()
          navigate('/emailVerification')
        } else {
          toast.error(data.message)
        }
      } else {
        console.log("Login Data:", { email, password });
        const { data } = await axios.post(backendUrl + '/api/auth/logIn', { email, password })

        if (data.success) {
          setIsLoggedIn(true)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      return toast.error(error.message)
    }

  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen flex flex-col items-center justify-center px-4 relative">
      {/* Logo Top Left */}
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="h-12 absolute top-6 left-6 cursor-pointer hover:scale-110 transition-transform"
      />

      {/* Login Box */}
      <div className="bg-white shadow-2xl w-full max-w-md p-10 rounded-3xl border border-indigo-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            {isSignUp ? "Sign up to get started" : "Login to continue"}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleOnSubmit}>
          {/* Username (Only for Sign Up) */}
          {isSignUp && (
            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:border-indigo-400 focus-within:bg-white transition-all">
              <img src={assets.person_icon} alt="user" className="w-5 h-5 mr-3 opacity-60" />
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          )}

          {/* Email */}
          <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:border-indigo-400 focus-within:bg-white transition-all">
            <img src={assets.mail_icon} alt="mail" className="w-5 h-5 mr-3 opacity-60" />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:border-indigo-400 focus-within:bg-white transition-all">
            <img src={assets.lock_icon} alt="lock" className="w-5 h-5 mr-3 opacity-60" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-700 ml-2 transition-colors"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {/* Forgot Password (Only for Login) */}
          {!isSignUp && (
            <p onClick={() => navigate('/resetPassword')} className="text-right text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer font-medium">
              Forgot Password?
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all transform hover:scale-[1.02] shadow-md hover:shadow-xl mt-6"
          >
            {isSignUp ? "Create Account" : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
          >
            {isSignUp ? "Login here" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
