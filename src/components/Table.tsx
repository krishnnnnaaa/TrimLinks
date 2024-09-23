'use client'
import React, { useEffect, useState } from 'react'
import { DataTable } from './Data-table'
import { columns } from './Columns'
import axios, { AxiosError } from 'axios'
import {User} from 'next-auth'
import { getSession, useSession } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import { ApiResponse } from '@/types/ApiResponse'

const Table = () => {
    const {data:session} = useSession()
    // const [user, setUser] = useState<string>()
    const [Tabledata, setTableData] = useState([])
    const {toast} = useToast()
    
    const email = session?.user.email
    
    
    useEffect(() => {

        const fetchData = async()=>{            
          const response = await axios.post('/api/getUrls', {email})
          console.log(response, email);
          try {
                
                if(response.data){
                    setTableData(response.data.data)
                    console.log('d');
                }
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                const errorMsg = axiosError.response?.data.message
                toast({
                    title: "Fetching failed",
                    description: errorMsg
                })
                }
        }
        fetchData()
    }, [session])
    
  return (
    <div className="container mx-auto py-10 w-3/4">
      <DataTable columns={columns} data={Tabledata} />
    </div>

  )
}

export default Table