import Stats from '@/components/Stats'
import Table from '@/components/HomePageTable'
import Tagline from '@/components/Tagline'
import UrlGenerator from '@/components/UrlGenerator'
import React from 'react'
import Navbar from '@/components/Navbar'
import ComingSoon from '@/components/ComingSoon'
import Footer from '@/components/Footer'

const WorkspacePage = () => {
  return (
    <div>
      <Navbar/>
      <UrlGenerator/>
      <Tagline/>
      <Stats/>
      <Table/>
      <ComingSoon/>
      <Footer/>
    </div>
  )
}

export default WorkspacePage