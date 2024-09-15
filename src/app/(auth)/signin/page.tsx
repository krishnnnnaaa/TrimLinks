'use client'
import { useSession } from "next-auth/react"

export default function Component() {
  const { data: session, status } = useSession()
  console.log(session?.user);
  

  if (status === "authenticated") {
    return <p>Signed in </p>
  }

  return <a href="/api/auth/signin">Sign in</a>
}