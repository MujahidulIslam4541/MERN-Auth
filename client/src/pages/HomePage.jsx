import { useContext } from 'react'
import Navbar from '../components/Navbar'
import Todo from './todo/todo'
import { AppContent } from '../context/AppContent'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const HomePage = () => {
  const { isLoggedIn, userData, backendUrl } = useContext(AppContent)
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  const sendVerificationOtp = async () => {
    const res = await axios.post(backendUrl + '/api/auth/send-verify-otp')
    if (res.data.success) {
      navigate('/emailVerification')
      toast.success(res.data.message)
    }
  }




  return (
    <div className=" bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />

      {isLoggedIn && userData.isVerified ? (
        <Todo />
      ) : (
        <div className="min-h-[90vh] flex items-center justify-center px-4 ">
          <div className="max-w-4xl w-full">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 mb-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-lg">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>

              <h1 className="text-5xl font-bold text-gray-800 mb-2">
                Your Smart Todo Manager
              </h1>
              <p className="text-xl text-gray-600 mb-2 max-w-2xl mx-auto">
                Stay organized, boost productivity, and never miss a task. Manage your daily tasks with ease and efficiency.
              </p>
              <p className="text-lg text-indigo-600 font-semibold">
                {isLoggedIn
                  ? <button onClick={sendVerificationOtp}><Link>Please verify your account to start managing your todos!</Link></button>
                  : "Login now and start organizing your tasks!"}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-2">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100 text-center">
                <div className="w-14 h-14 mx-auto mb-2 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Easy Task Creation</h3>
                <p className="text-gray-600 text-sm">Quickly add and organize your tasks</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Track Progress</h3>
                <p className="text-gray-600 text-sm">Mark tasks complete and stay motivated</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-pink-100 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Never Forget</h3>
                <p className="text-gray-600 text-sm">Keep all your tasks in one place</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
