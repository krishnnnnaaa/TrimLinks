'use client'
import { Url } from "@/model/User";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { BarChart2Icon, Eye, Link2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";


const Stats = () => {
  const [links, setLinks] = useState<Url[]>([])
  const [totalLinksCreated, settotalLinksCreated] = useState(0)
  const [totalLinkViews, setTotalLinkViews] = useState(0)
  const [topLink, setTopLink] = useState<Url>()
  const {data:session} = useSession()
  const email = session?.user.email

  
  const fetchData = async()=>{            
    try {
          const response = await axios.post('/api/getUrls', {email})
              if(response.data){
                setLinks(response.data.data)
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

  useEffect(() => {
    if(links?.length > 0){
      const totalLinksCreated = links?.length;
      const totalLinkViews = links.reduce((total, link) => total + link.views, 0);
      const topLink = links.reduce((prev, current) => (current.views > prev.views ? current : prev), links[0]);
      if(totalLinkViews && totalLinksCreated && topLink){
        settotalLinksCreated(totalLinksCreated)
        setTotalLinkViews(totalLinkViews)
        setTopLink(topLink)
      }
    }
  }, [links])
  
  

  return (
    <div>
      <section className="bg-[#030315] dark:bg-white dark:text-[#030315] text-white body-font py-10">
        <div className="w-full pt-6 px-8 md:px-20 text-center">
            <h1 className="font-bold text-3xl md:text-5xl my-3">Your Link Performance at a Glance</h1>
            <p className="text-2xl my-3">Track key metrics like total clicks, top links, and audience engagement in real-time.</p>
        </div>
        <div className="container px-5 pb-24 pt-8 mx-auto flex w-full flex-wrap">
        <div className="flex flex-wrap -m-4 text-center w-full">
      <div className="p-4 w-full flex-wrap flex justify-evenly items-center">
        <div className="flex justify-center items-center m-4 flex-col border-2 border-gray-800 px-4 py-6 
        rounded-lg w-2/5 md:w-1/4">
          <Link2 className="mb-4 p-3 dark:bg-[#030315] dark:text-white rounded-full text-[#030315] bg-white" 
          size={60}/>
          <h2 className="font-bold  text-5xl">{totalLinksCreated}</h2>
          <p className="leading-relaxed font-semibold">Links Created</p>
        </div>
        <div className="flex justify-center items-center m-4 flex-col border-2 border-gray-800 px-4 py-6 
        rounded-lg w-2/5 md:w-1/4">
          <Eye className="mb-4 p-3 dark:bg-[#030315] dark:text-white rounded-full text-[#030315] bg-white" 
           size={60}/>
          <h2 className="font-bold  text-5xl">{totalLinkViews}</h2>
          <p className="leading-relaxed font-semibold">Total Views</p>
        </div>
        <div className="flex justify-center items-center m-4 flex-col border-2 border-gray-800 px-4 py-6 
        rounded-lg w-2/5 md:w-1/4">
          <BarChart2Icon className="mb-4 p-3 dark:bg-[#030315] dark:text-white rounded-full text-[#030315] bg-white" size={60}/>
          <h2 className="font-bold  text-5xl">{topLink?.views}</h2>
          <p className="leading-relaxed font-semibold">Top Links Views</p>
        </div>
      </div>
        </div>
    </div>
    </section>
    </div>
  );
};

export default Stats;
