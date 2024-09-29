'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { ApiResponse } from '@/types/ApiResponse'
import axios, { AxiosError } from 'axios'
import { Loader2, ShieldEllipsisIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import passwordResetDoneGif from '../../../verified.gif'
import Image from 'next/image'

const ResetPasswordPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isPasswordResetDone, setIsPasswordResetDone] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {toast} = useToast()
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const token = searchParams.get('token')
    

        const resetPassword = async()=>{
            setIsLoading(true)
            if(password === confirmPassword){
                try {
                    const response = await axios.post<ApiResponse>('/api/passwordReset', {password, email, token})
                    if(response.data.success){
                    setIsLoading(false)
                    setIsPasswordResetDone(true)
                    toast({
                        title: 'Password reset successfully'
                    })
                }
            } catch (error) {
                console.error("Error in verifying user", error);
                const axiosError = error as AxiosError<ApiResponse>;
                toast({
                    title: 'Password reset failed',
                    description: axiosError.response?.data.message
                })
                setIsLoading(false);
              } finally {
                  setIsLoading(false);
                }
              }else{
                toast({
                  title: 'Please enter same password!',
                  variant: 'destructive'
                })
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
         isPasswordResetDone ? (
            <div className="md:w-full min-h-screen flex md:text-left text-center flex-col justify-start items-center">
          <div className="py-28 md:block flex flex-col items-center">
            <Image
              src={passwordResetDoneGif}
              alt="passwordResetDone"
              className="my-4"
              width={100}
              height={100}
              unoptimized
            />
            <div>
              <h1 className="font-semibold texl-2xl my-2">
                Password Reset successfully.
              </h1>
              <p className="text-gray-500">
                Thanks for your patience! You can now continue using Trimlinks
                to shorten your URLs.
              </p>
              <p className="text-gray-500">
                If you&apos;re done here, feel free to close this window.
              </p>
            </div>
          </div>
        </div>
         )   : (
        <div className='flex flex-col justify-center h-4/5 items-center'>
            <div className='flex flex-col items-center'>
                <ShieldEllipsisIcon size={70} className='border-2 rounded-lg p-3 my-4'/>
                <h1 className='text-3xl font-bold'>Set up new password</h1>
                <p className='text-gray-400 text-sm'>Must be at least 8 characters..</p>
            </div>

            <div className='my-6'>
                <div className='flex flex-col justify-start w-80'>
                    <label htmlFor="password">
                        Password
                    </label>
                        <Input onChange={(e)=> setPassword(e.target.value)} placeholder='Enter new Password' className='md:h-auto md:text-base h-12 text-xl' type="password" id='email' />
                </div>
                <div className='flex flex-col justify-start w-80 my-4'>
                    <label htmlFor="confirm-email">
                        Confirm Password
                    </label>
                        <Input onChange={(e)=> setConfirmPassword(e.target.value)} placeholder='Confirm new Password' className='md:h-auto md:text-base h-12 text-xl' type="password" id='confirm-email' />
                </div>
                <div>
                <Button type="submit" onClick={resetPassword} className='md:h-auto md:text-base h-12 text-xl w-full' disabled={isLoading}>
          {
            isLoading ? (
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              </>
            ) : 'Reset Password'
          }
        </Button>
                </div>
                <div className='w-full text-center mt-4'>or <Link href={'/signin'} className='text-blue-600 underline'>Login</Link></div>
            </div>
        </div>

         ) 
        }
    </div>
  )
}

export default ResetPasswordPage