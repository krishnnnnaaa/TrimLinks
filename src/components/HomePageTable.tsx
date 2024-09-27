'use client'
import React, { useEffect, useState } from 'react'
import { DataTable } from './Data-table'
import { columns } from './Columns'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import { ApiResponse } from '@/types/ApiResponse'
import { ArrowUpRightFromSquareIcon } from 'lucide-react'
import Link from 'next/link'

const Table = () => {
    const {data:session} = useSession()
    const [Tabledata, setTableData] = useState([])
    const [results, setResults] = useState({initialResult: 0, finalResult: 0})
    const {toast} = useToast()
    
    const email = session?.user.email
    
    
    const fetchData = async()=>{            
      try {
            const response = await axios.post('/api/getUrls', {email})
            setTableData(response.data.data.slice(0,5))
            
            const lengthOfData = response.data.data.length
                if(response.data){
                  const recentLinks:[] = response.data.data.slice(0,5)
                  setResults({initialResult: recentLinks.length, 
                    finalResult: lengthOfData})
                  }
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
    <div className="container mx-auto py-10 w-full flex flex-col justify-center items-center dark:bg-[#030315] dark:text-white bg-white
     text-[#030315]">
      <h1 className='text-5xl font-semibold mt-10 mb-3 text-[#030315] dark:text-white'>Overview</h1>
      <p className='text-[#030315] dark:text-white mb-10 text-xl'>Manage Your Links Effortlessly - Track, Copy, and Control with Ease</p>
      <DataTable columns={columns} useremail={email as string} data={Tabledata}/>
      <div className="w-3/4 mt-4 text-center flex justify-center space-x-2">
      <p>Showing {results.initialResult} of {results.finalResult}</p>
      <Link href={'/dashboard'} className='dark:text-white text-[#030315] underline'>See More <ArrowUpRightFromSquareIcon className="inline" size={18}/></Link>
      </div>
      
    </div>

  )
}

export default Table