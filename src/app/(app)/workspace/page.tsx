import Stats from '@/components/Stats'
import Table from '@/components/Table'
import Tagline from '@/components/Tagline'
import UrlGenerator from '@/components/UrlGenerator'
import React from 'react'

const page = () => {
  return (
    <div>
      <UrlGenerator/>
      <Tagline/>
      <Stats/>
      <Table/>
    </div>
  )
}

export default page