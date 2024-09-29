"use client"
 
import {CustomTableMeta} from '../types/Columns'
import { ColumnDef,  } from "@tanstack/react-table"
import { ArrowUpRightFromSquare, Link, MoreVertical } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"

export type Links = {
    id: string,
    _id: string,
    shortId: string,
    redirectUrl:string,
    createdAt: Date,
    views: string
}


const deleteData = async(email:string, id: string)=>{
  try {
    await axios.post('/api/deleteShortId', {email, urlID: id})    
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMsg = axiosError.response?.data.message
    console.log(errorMsg);
    }
}

export const columns: ColumnDef<Links>[] = [
    {
      accessorKey: "shortId",
      header: "Short Url",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Link className="bg-sky-600 p-3 rounded-lg text-white " size={40}/>
          <a href={row.original.shortId} target='_blank' className="flex items-center text-blue-500 hover:underline">
            {row.original.shortId}
            <ArrowUpRightFromSquare className='ml-2 text-[#030315] dark:text-white' size={15}/>
          </a>
        </div>
      ),
    },
    {
      accessorKey: "redirectUrl",
      header: "Url",
      cell: ({row}) => {
        const concatinatedStr = row.original.redirectUrl
        return <span>{concatinatedStr.length > 30 ? concatinatedStr.slice(0, 30) + "..." : concatinatedStr}</span>
      }
    },
    {
      accessorKey: "views",
      header: "Views",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const formattedDate = new Date(row.original.createdAt).toLocaleString().split(",")[0];
        return <span>{formattedDate}</span>;
      },
    },


    {
      id: "share",
      cell: ({ row, table }) => {
        const useremail = (table.options.meta as CustomTableMeta).useremail
        
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(row.original.shortId)}
              >
                Copy URL
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=> {
                deleteData(useremail, row.original._id)
              }}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    }
  ]