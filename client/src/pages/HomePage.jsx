import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Todo from './todo/todo'
import { AppContent } from '../context/AppContent'

const HomePage = () => {
  const { isLoggedIn, userData } = useContext(AppContent)
  console.log(isLoggedIn, userData.isVerified)
  return (
    <div className="bg-[url('/bg_img.png')] bg-cover bg-center min-h-screen">
      <Navbar />
      <Header />
      <Todo />
    </div>

  )
}

export default HomePage
