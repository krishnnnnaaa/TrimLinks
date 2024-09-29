'use client'
import React, { useEffect, useState } from 'react'
import { DataTable } from './Data-table'
import { columns } from './Columns'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { ApiResponse } from '@/types/ApiResponse'

const Table = () => {
    const {data:session} = useSession()
    const [Tabledata, setTableData] = useState([])
    
    const email = session?.user.email
    
    
    const fetchData = async()=>{            
      try {
            const response = await axios.post('/api/getUrls', {email})
            setTableData(response.data.data)
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                const errorMsg = axiosError.response?.data.message
                console.log(errorMsg);
                
                }
        }
    useEffect(() => {
        fetchData()
        
    }, [session])
    
  return (
    <div className="container mx-auto min-h-screen py-10 w-full flex flex-col
     items-center dark:bg-[#030315] dark:text-white bg-white
     text-[#030315]">
      <h1 className='md:text-5xl text-3xl text-center md:text-left font-semibold mt-10 mb-3 text-[#030315]
       dark:text-white'>Manage All Your Links in One Place</h1>
      <p className='text-[#030315] dark:text-white mb-10 text-xl md:text-left text-center md:px-0 px-8'>
      View and manage the entire collection of your shortened links</p>
      <DataTable columns={columns} useremail={email as string} data={Tabledata}/>
      
    </div>

  )
}

export default Table