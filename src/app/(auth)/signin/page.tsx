'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import _ from 'lodash'
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"


const page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {toast} = useToast()
  const router = useRouter()

  // zod implementation

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const onSubmit = async (data:z.infer<typeof signInSchema>)=> {
    const response = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password
    })
    

    if(response?.error){
      toast({
        title: "Login Failed!",
        description: "Invalid username or password",
        variant: "destructive"
      })
    }else if(response?.url){
      router.replace('/workspace')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#030315] text-white">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-left mb-8">
            TrimLinks
          </h1>
          <div>
            <p className="text-4xl font-bold text-left mb-6">Welcome Again! 🔥</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
            <FormField
          name="identifier"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className='md:h-auto md:text-base h-12 text-xl' placeholder="email" {...field}
                 />
              </FormControl>
            </FormItem>
          )}
        />
            <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input className='md:h-auto md:text-base h-12 text-xl' type="password" placeholder="password" {...field}
                 />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className='md:h-auto md:text-base h-12 text-xl w-full' type="submit" disabled={isSubmitting}>
          {
            isSubmitting ? (
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              <span>Please wait...</span>
              </>
            ) : 'Signin'
          }
        </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p className="md:text-base text-lg text-gray-400">
              Don&apos;t have an account? {"     "}
              <Link href={'/signup'} className="text-blue-600 hover:text-blue-800">Register</Link>
            </p>

          </div>
        </div>
      </div>
      
    </div>
  )
}

export default page
