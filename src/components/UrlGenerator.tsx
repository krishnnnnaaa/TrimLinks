import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Image from 'next/image'
import hero from '../app/hero.png'

const UrlGenerator = () => {
  return (
    <div className='w-full py-10 flex justify-around items-center dark:bg-[#030315] bg-white dark:text-white text-[#030315]'>
      <div className='flex flex-col'>
        <div className='w-full my-6'>
        <span className='text-xl'>Hey Krishna! 👋</span>
            <h1 className='text-4xl font-bold my-4'>Simplify Your Links</h1>
            <p className='text-2xl '>Shorten, Share, and Track Your URLs with Ease</p>
        </div>
        <div className='w-full'>
            <div className='flex my-4 space-x-4'>
        <Input type="text" className='py-2' placeholder="Enter the url" />
        <Button>Submit</Button>
            </div>
        <Input type="text" readOnly placeholder="Short url will generate once submit your url" />
      </div>
        </div>
        <div>
          <Image src={hero} alt='women working in pic' width={400} height={400}/>
        </div>
    </div>
  )
}  

export default UrlGenerator