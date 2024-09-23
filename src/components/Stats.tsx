import { BarChart2Icon, Eye, Link2 } from "lucide-react";
import React from "react";

const Stats = () => {
  return (
    <div>
      <section className="bg-[#030315] dark:bg-white dark:text-[#030315] text-white body-font py-10">
        <div className="w-full pt-6 px-20 text-center">
            <h1 className="font-bold text-5xl my-3">Your Link Performance at a Glance</h1>
            <p className="text-2xl my-3">Track key metrics like total clicks, top links, and audience engagement in real-time.</p>
        </div>
        <div className="container px-5 pb-24 pt-8 mx-auto flex w-full flex-wrap">
        <div className="flex flex-wrap -m-4 text-center w-full">
      <div className="p-4 w-full flex-wrap flex justify-evenly items-center">
        <div className="flex justify-center items-center m-4 flex-col border-2 border-gray-800 px-4 py-6 
        rounded-lg w-1/4">
          <Link2 className="mb-4 p-3 dark:bg-[#030315] dark:text-white rounded-full text-[#030315] bg-white" 
          size={60}/>
          <h2 className="font-bold  text-5xl">192</h2>
          <p className="leading-relaxed font-semibold">Links Created</p>
        </div>
        <div className="flex justify-center items-center m-4 flex-col border-2 border-gray-800 px-4 py-6 
        rounded-lg w-1/4">
          <Eye className="mb-4 p-3 dark:bg-[#030315] dark:text-white rounded-full text-[#030315] bg-white" 
           size={60}/>
          <h2 className="font-bold  text-5xl">647</h2>
          <p className="leading-relaxed font-semibold">Total Views</p>
        </div>
        <div className="flex justify-center items-center m-4 flex-col border-2 border-gray-800 px-4 py-6 
        rounded-lg w-1/4">
          <BarChart2Icon className="mb-4 p-3 dark:bg-[#030315] dark:text-white rounded-full text-[#030315] bg-white" size={60}/>
          <h2 className="font-bold  text-5xl">258</h2>
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
