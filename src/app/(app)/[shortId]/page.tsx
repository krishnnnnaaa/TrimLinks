'use client'
import { redirect, useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default async function Page() {
  const params  = useParams()
  const router = useRouter()
  const { shortId } = params
useEffect(() => {
  const fetchData = async()=> {
  try {
    // Making a POST request using the fetch API from the server component
    const response = await fetch('/api/getShortId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ shortId: `http://localhost:3000/${shortId}` }),
    })
    
    const resData = await response.json()
    router.replace(resData.data.redirectUrl)
      } catch (error) {
        console.error('Error fetching redirect URL:', error)
      }
    }
    fetchData()
    }, [])

  // return null // Return null since no UI is needed
}
