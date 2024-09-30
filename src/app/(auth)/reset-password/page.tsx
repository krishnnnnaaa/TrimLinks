'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { ApiResponse } from '@/types/ApiResponse'
import axios, { AxiosError } from 'axios'
import { FingerprintIcon, Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import emailSentGif from '../../verified.gif'
import Image from 'next/image'

const ResetPasswordEmailPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState('')
    const {toast} = useToast()

    const sendResetInstruction = async()=>{
            setIsLoading(true)
            try {
                const response = await axios.post<ApiResponse>('/api/passwordResetEmail', {email})
                if(response.data.success){
                    setIsLoading(false)
                    setEmailSent(true)
                }
            } catch (error) {
                console.error("Error in verifying user", error);
                const axiosError = error as AxiosError<ApiResponse>;
                toast({
                    title: 'Email submission failed',
                    description: axiosError.response?.data.message
                })
              } finally {
                setIsLoading(false);
              }
        }
  return (
    <div className='bg-[#030315] w-full h-screen'>
        <div className='flex justify-between p-8'>
            <span>TrimLinks</span>
            <Link href={'/signup'}>Create an account</Link>
        </div>
        {
            emailSent ? (
                <div className="md:w-full min-h-screen flex md:text-left text-center flex-col justify-start items-center">
          <div className="py-28 md:block flex flex-col items-center">
            <Image
              src={emailSentGif}
              alt="verified"
              className="my-4"
              width={100}
              height={100}
              unoptimized
            />
            <div>
              <h1 className="font-semibold texl-2xl my-2">
                Email sent successfully.
              </h1>
              <p className="text-gray-500">
                We have sent you an email regarding password reset. Kindly check your email for further instructions.
              </p>
              <p className="text-gray-500">
                If you&apos;re done here, feel free to close this window.
              </p>
            </div>
          </div>
        </div>
            ) : (
        <div className='flex flex-col justify-center h-4/5 items-center'>
            <div className='flex flex-col items-center'>
                <FingerprintIcon size={70} className='border-2 rounded-lg p-3 my-4'/>
                <h1 className='text-3xl font-bold'>Forgot password?</h1>
                <p className='text-gray-400 text-sm'>No worries, we&apos;ll send you reset instructions.</p>
            </div>

            <div className='my-6'>
                <div className='flex flex-col justify-start w-80'>
                    <label htmlFor="email">
                        Email
                    </label>
                        <Input onChange={(e)=> setEmail(e.target.value)} placeholder='Enter your email' className='md:h-auto md:text-base h-12 text-xl' type="email" id='email' />
                </div>
                <div>
                    <Button className='md:h-auto md:text-base h-10 mt-6 text-lg w-full' onClick={sendResetInstruction}>
                    {
            isLoading ? (
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              </>
            ) : 'Reset Password'
          }
                    </Button>
                </div>
            </div>
        </div>

            )
        }

    </div>
  )
}

export default ResetPasswordEmailPage