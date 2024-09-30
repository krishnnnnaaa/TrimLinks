'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useCallback, useState } from "react"
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
import { Loader2} from "lucide-react"
import _ from 'lodash'


const SignupPage = () => {
  const [usernameMsg, setusernameMsg] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {toast} = useToast()
  const router = useRouter()

  // zod implementation

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: ''
    }
  })

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

  const onSubmit = async (data:z.infer<typeof signUpSchema>)=> {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>('/api/signup', data)
      if(response.data.success){

        toast({
          title: "Success",
          description: response.data.message
        })
        router.replace('/signin')
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
    // the debounce is set to 1000ms, meaning 'checkingUser' will only be called 1000ms after the user stops typing.
    _.debounce((debouncedUsername: string) => checkingUser(debouncedUsername), 500), []);
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#030315] text-white">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md">
        <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-left mb-8">
            TrimLinks
          </h1>
          <div>
            <p className="text-4xl font-bold text-left">Hi there 👋</p>
            <p className="text-lg text-gray-400  text-left mb-8">Let&apos;s get started.</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">

            <div className='flex space-x-4'>

            <FormField
          name="firstname"
          control={form.control}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input className='md:h-auto md:text-base h-10 text-lg' placeholder="e.g., John" {...field}/>
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
                <Input className='md:h-auto md:text-base h-10 text-lg' placeholder="e.g., Doe" {...field}/>
              </FormControl>
            </FormItem>
          )}
          />
          </div>
            <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className='md:h-auto md:text-base h-10 text-lg' placeholder="e.g., johndoe592" {...field}
                onChange={(e)=> {
                  field.onChange(e)
                  debouncedResults(e.target.value)
                }}
                 />
              </FormControl>
              <span className="text-sm">
                {
               isCheckingUsername ? <Loader2 className="animate-spin" size={20}/> : (usernameMsg === 'Username is available!' ? (<span className="text-green-600">{usernameMsg}</span>) : (<span className="text-red-600">{usernameMsg}</span>))
                }
              </span>
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
                <Input className='md:h-auto md:text-base h-10 text-lg' placeholder="e.g., example@gmail.com" {...field}
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
                <Input className='md:h-auto md:text-base h-10 text-lg' type="password" placeholder="password" {...field}
                 />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className='md:h-auto md:text-base h-10 text-lg w-full' disabled={isSubmitting}>
          {
            isSubmitting ? (
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              </>
            ) : 'Get Started'
          }
        </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p className="md:text-base text-lg text-gray-400">
              Already a member? {"    "}
              <Link href={'/signin'} className="text-blue-600 hover:text-blue-800">Sign in</Link>
            </p>

          </div>
        </div>
      </div>
      
    </div>
  )
}

export default SignupPage