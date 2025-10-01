import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const HomePage = () => {
  return (
    <div className="bg-[url('/bg_img.png')] bg-cover bg-center min-h-screen">
      <Navbar />
      <Header />
    </div>

  )
}

export default HomePage
