import DashboardTable from '@/components/DashboardTable'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
      <DashboardTable/>
      <Footer/>
    </div>
  )
}

export default page