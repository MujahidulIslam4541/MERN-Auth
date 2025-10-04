import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Todo from './todo/todo'
import { AppContent } from '../context/AppContent'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const { isLoggedIn, userData } = useContext(AppContent)
  console.log(isLoggedIn, userData.isVerified)
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />
      {/* <Header /> */}
      {isLoggedIn && userData.isVerified ? <Todo /> : <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-indigo-100">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Access Restricted
          </h2>

          {/* Message */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            Please login and verify your account to access the Todo section.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Link to='/login'>
              <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-md">
                Login Now
              </button>
            </Link>
            {/* <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all">
              Create Account
            </button> */}
          </div>
        </div>
      </div>}

    </div>

  )
}

export default HomePage
