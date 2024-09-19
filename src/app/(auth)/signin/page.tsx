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


const page = () => {
  const [username, setUsername] = useState('')
  const [usernameMsg, setusernameMsg] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {toast} = useToast()
  const router = useRouter()

  // zod implementation

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  // useEffect(() => {
    const checkingUser = async (debouncedUsername: string)=> {
      if(debouncedUsername){
        setIsCheckingUsername(true)
        setusernameMsg("")
        try {
          const response = await axios.get(`/api/unique-name?username=${debouncedUsername}`)
          setusernameMsg(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setusernameMsg(
            axiosError.response?.data.message ?? 'Error in checking username'
          )
        } finally{
          setIsCheckingUsername(false)
        }
      }
    }
    // checkingUser()
  // }, [])

  const onSubmit = async (data:z.infer<typeof signUpSchema>)=> {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>('/api/signup', data)
      if(response.data.success){

        toast({
          title: "Success",
          description: response.data.message
        })
        router.replace('/')
      }
    } catch (error) {
     console.error("Error in signup", error) 
     const axiosError = error as AxiosError<ApiResponse>;
     const errorMsg = axiosError.response?.data.message
     toast({
      title: "signup failed",
      description: errorMsg,
      variant: "destructive"
     })
     setIsSubmitting(false)
    }
    finally{
      setIsSubmitting(false)
    }
  }

  
  const debouncedResults = useCallback(
    // the debounce is set to 1000ms, meaning 'getResults' will only be called 1000ms after the user stops typing.
    _.debounce((debouncedUsername: string) => checkingUser(debouncedUsername), 1000), []);
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join TrimLinks
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field}
                onChange={(e)=> {
                  field.onChange(e)
                  debouncedResults(e.target.value)
                }}
                 />
              </FormControl>
            </FormItem>
          )}
        />
            <FormField
          name="email"
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
              </>
            ) : 'Signup'
          }
        </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p>
              Already a member?
              <Link href={'/signin'} className="text-blue-600 hover:text-blue-800">Sign in</Link>
            </p>

          </div>
        </div>
      </div>
      
    </div>
  )
}

export default page
