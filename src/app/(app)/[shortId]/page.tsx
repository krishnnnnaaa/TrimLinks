'use client'
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  const params = useParams()
  const router = useRouter()
  const { shortId } = params

  useEffect(() => {
    // Check if the window object is available (client-side)
    if (typeof window === 'undefined') return;

    // Safely access localStorage and fetch userId
    const userIdString = localStorage.getItem('trimlinks-id');
    if (!userIdString) return;

    // Parse the userId from localStorage
    const userId = JSON.parse(userIdString);
    if (!userId || !userId.id) return;
    
    
    // Define the asynchronous fetch function
    const fetchData = async () => {
      try {
        console.log('s');
        const response = await fetch('/api/getShortId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ shortId: `http://localhost:3000/${shortId}`, userId: userId.id }),
        })

        // Parse the JSON response
        const resData = await response.json()

        // Check for redirect URL and navigate
        if (resData?.data?.redirectUrl) {
          router.replace(resData.data.redirectUrl)
        }
      } catch (error) {
        console.error('Error fetching redirect URL:', error)
      }
    }

    // Call the fetch function
    fetchData()
  }, [shortId, router]) // Include dependencies to avoid ESLint warnings
}
