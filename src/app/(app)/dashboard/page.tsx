import DashboardTable from '@/components/DashboardTable'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const DashboardPage = () => {
  return (
    <div>
      <Navbar/>
      <DashboardTable/>
      <Footer/>
    </div>
  )
}

export default DashboardPage