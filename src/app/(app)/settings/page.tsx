'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const SettingsPage = () => {
    const {data:session} = useSession()
    const form = useForm();
    const {setValue} = form;

    useEffect(() => {
      setValue('firstname', session?.user.firstname)
      setValue('lastname', session?.user.lastname)
      setValue('username', session?.user.username)
      setValue('email', session?.user.email)
      setValue('password', 'YOUR_PASSWORD')
    }, [session])
    

    
  return (
    <>
    <Navbar/>
    <div className="container py-6 md:px-20 px-8 w-full flex flex-col
      dark:bg-[#030315] dark:text-white bg-white
     text-[#030315]">
      <h1 className='text-3xl text-left font-semibold mt-6 mb-3 text-[#030315]
       dark:text-white'>Settings</h1>
       <div className='md:w-2/5 w-full my-10'>
       <Form {...form}>
            <form className="space-y-6 text-left">
                <div className='flex space-x-4'>

            <FormField
          name="firstname"
          control={form.control}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input className='md:h-auto md:text-base h-10 text-lg' disabled placeholder="e.g., John" {...field}/>
              </FormControl>
            </FormItem>
          )}
        />
            <FormField
          name="lastname"
          control={form.control}
          render={({ field }) => (
              <FormItem className='w-full'>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
              <Input className='md:h-auto md:text-base h-10 text-lg' disabled placeholder="e.g., Doe" {...field}/>
              </FormControl>
            </FormItem>
          )}
          />
          </div>
            <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
              <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
              <Input className='md:h-auto md:text-base h-10 text-lg'  disabled placeholder="e.g., example@gmail.com" {...field}
                 />
              </FormControl>
            </FormItem>
          )}
        />
          <FormField
        name="username"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
            <Input className='md:h-auto md:text-base h-10 text-lg' disabled placeholder="e.g., johndoe592" {...field}/>
            </FormControl>
          </FormItem>
        )}
      />
      <div className='flex space-x-4 items-end'>
            <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Password</FormLabel>
              <FormControl>
              <Input className='md:h-auto md:text-base h-10 text-lg' disabled type="password" placeholder="password" {...field}
                 />
              </FormControl>
            </FormItem>
          )}
          />
          <Link href={'/reset-password'}>
          <Button className='bg-red-700 hover:bg-red-800 px-6 py-2 rounded-lg text-white md:h-auto md:text-base h-10 text-lg'>Reset Password</Button>
          </Link>
          </div>
            </form>
          </Form>
       </div>
          <div className='w-full md:w-3/5 border-red-700 border-2 rounded-lg my-8 py-2 px-8'>
            <div className='my-4'>
              <h1 className='text-2xl font-semibold my-2'>Danger Zone</h1>
              <p className='md:text-base text-sm'>Once you delete your account, there is no going back. Please be certain.</p>
            </div>
            <div className='py-2'>
              <Button className='bg-red-700 hover:bg-red-800 px-6 py-2 rounded-lg text-white'>Delete Account</Button>
            </div>
          </div>
       </div>
       <Footer/>
       </>
  )
}

export default SettingsPage