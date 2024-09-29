import dbConnect from '@/lib/dbConnect'
import {NextAuthOptions} from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt  from 'bcryptjs'
import { UserModel } from '@/model/User'


type CredentialsType = {
    identifier: string;
    password: string;
  };



export const authOptions:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials?: { identifier?: string, password: string }):Promise<any> {
                  await dbConnect()

                  try {
                    const user = await UserModel.findOne({
                        $or: [
                            {email: credentials?.identifier},
                            {username: credentials?.identifier},
                        ]
                    }) 
                    
                    if(!user){
                        throw new Error("User not found with the given credential");
                    }
                    const isPasswordValid = await bcrypt.compare(credentials?.password as string, user.password)
                    if(isPasswordValid){
                        return user;
                    }else{
                        throw new Error("Invalid Password")
                    }
                  } catch (error) {
                    if(error instanceof Error){
                        throw new Error(error.message);
                    }
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
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.firstname = token.firstname;
                session.user.lastname = token.lastname;
            }
            return session
          },
          async jwt({ token, user }) {
            if(user){
                token._id = user._id?.toString();
                token.email = user.email,
                token.username = user.username,
                token.firstname = user.firstname,
                token.lastname = user.lastname;
            }
            return token
          }
    }
}