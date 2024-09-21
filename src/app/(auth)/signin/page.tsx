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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join TrimLinks
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
            <FormField
          name="identifier"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field}
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
                <Input type="password" placeholder="password" {...field}
                 />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {
            isSubmitting ? (
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              <span>Please wait...</span>
              </>
            ) : 'Signup'
          }
        </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p>
              Don&apos;t have an account?
              <Link href={'/signup'} className="text-blue-600 hover:text-blue-800">Register</Link>
            </p>

          </div>
        </div>
      </div>
      
    </div>
  )
}

export default page
