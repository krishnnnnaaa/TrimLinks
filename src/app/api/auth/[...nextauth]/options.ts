import dbConnect from '@/lib/dbConnect'
import {NextAuthOptions} from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt  from 'bcryptjs'
import { UserModel } from '@/model/User'

export const authOptions:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials:any):Promise<any> {
                  await dbConnect()

                  try {
                    const user = await UserModel.findOne({
                        $or: [
                            {email: credentials.identifier},
                            {name: credentials.identifier},
                        ]
                    }) 
                    
                    if(!user){
                        throw new Error("User not found with the given credential");
                    }
                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
                    if(isPasswordValid){
                        return user;
                    }else{
                        throw new Error("Invalid Password")
                    }
                  } catch (error:any) {
                    throw new Error(error);
                  }
              },
        })
    ],
    pages: {
        signIn: '/signin'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET_KEY,
    callbacks: {
        async session({ session, token }) {
            if(token){    
                session.user._id = token._id;
            }
            return session
          },
          async jwt({ token, user }) {
            token._id = user._id?.toString();
            return token
          }
    }
}