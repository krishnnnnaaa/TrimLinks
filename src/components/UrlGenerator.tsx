'use client'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Image from 'next/image'
import hero from '../app/hero.png'
import axios, { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useToast } from '@/hooks/use-toast'
import { ApiResponse } from '@/types/ApiResponse'
import { Form, FormControl, FormField, FormItem } from './ui/form'
import { useSession } from 'next-auth/react'
import { Clipboard, ClipboardCheckIcon, Loader2 } from 'lucide-react'

const UrlGenerator = () => {
  const {toast} = useToast()
  const {data:session} = useSession()
  const email = session?.user.email
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [linkShortId, setLinkShortId] = useState('')
  const [isCopiedToClipboard, setIsCopiedToClipboard] = useState(false)
  const form = useForm({
    defaultValues: {
      redirectUrl: '',
      shortId: ''
    }
  })

  const {setValue} = form
  
useEffect(() => {
  
  setValue('shortId', linkShortId) 

}, [linkShortId])


    const setUrls = async(data: any)=>{ 
      setIsSubmitting(true)
      setIsCopiedToClipboard(false)
      try {
        const response = await axios.post<ApiResponse>('/api/createShortId', {url: data.redirectUrl, email})
        if(response.data.success){
          setLinkShortId(response.data.url?.shortId as string)
          toast({
            title: "Success",
            description: response.data.message
          })
        }
      } catch (error) {
       console.error("Error in trimming url", error) 
       const axiosError = error as AxiosError<ApiResponse>;
       const errorMsg = axiosError.response?.data.message
       toast({
        title: "Url trimming failed",
        description: errorMsg,
        variant: "destructive"
       })
       setIsSubmitting(false)
      }
      finally{
        setIsSubmitting(false)
      }
    }

    function copyToClipboard(){
      setIsCopiedToClipboard(true)
      navigator.clipboard.writeText(linkShortId)
    }
  

  return (
    <div className='w-full py-10 flex md:flex-row flex-col justify-around items-center dark:bg-[#030315] bg-white dark:text-white text-[#030315]'>
      <div className='flex flex-col md:p-0 px-5'>
        <div className='w-full my-6'>
        <span className='md:text-xl text-2xl'>Hey Krishna! 👋</span>
            <h1 className='text-4xl font-bold my-4'>Simplify Your Links</h1>
            <p className='md:text-2xl text-[20px]'>Shorten, Share, and Track Your URLs with Ease</p>
        </div>
        <div className='w-full'>
            <div className='flex my-4 space-x-4'>
        {/* <Input type="text" className='py-2' placeholder="Enter the url" /> */}
        <Form {...form}>
            <form onSubmit={form.handleSubmit(setUrls)} className="space-y-6 w-full text-left">
              <div className='flex md:space-x-4 space-x-0 w-full md:flex-row flex-col'>
            <FormField
          name="redirectUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem className='w-full '>
              <FormControl>
                <Input placeholder="Enter the url" className='md:text-base text-xl h-14 md:h-auto mb-6' {...field}
                 />
              </FormControl>
            </FormItem>
          )}
          />
        <Button className='md:w-auto w-full text-2xl md:text-base h-12 md:h-9' disabled={isSubmitting} type='submit'>
          {
              isSubmitting ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                </>
              ) : 'Submit'
          }
        </Button>
          </div>
            <FormField
          name="shortId"
          control={form.control}
          render={({ field }) => (
            <FormItem className='flex space-x-2  items-start justify-center'>
              <FormControl>
                <Input readOnly placeholder="Short url will generate once submit your url" className='md:text-base text-xl h-14 md:h-auto mb-6' {...field}
                 />
              </FormControl>
              {
                isCopiedToClipboard ? (
                  <ClipboardCheckIcon className='bg-white p-2 rounded-lg md:mt-[0!important] text-black' size={40}/>
                ) : (
                  <Clipboard onClick={copyToClipboard} className='bg-white p-2 md:mt-[0!important] rounded-lg text-black' size={40}/>
                )
              }
            </FormItem>
          )}
        />
            </form>
          </Form>
            </div>
      </div>
        </div>
        <div>
          <Image src={hero} alt='women working in pic' width={400} height={400}/>
        </div>
    </div>
  )
}  

export default UrlGenerator