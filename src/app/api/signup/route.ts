import { sendVerificationEmail } from "@/backer/verificationEmail";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { createTokenGenerator } from "cybertoken";
import  bcrypt from 'bcryptjs'
export async function POST(request:Request){
    await dbConnect()

    try {
        const { name, email, password} = await request.json();

        const existingVerifiedUser = await UserModel.findOne({email, verified: true});
        const token = createTokenGenerator({
            prefixWithoutUnderscore: "userkey",
        })

        
        if(existingVerifiedUser){
            return Response.json({
                success: false,
                message: "User already exists"
            }, {status: 400})
        }else{
            const encryptedPassword = await bcrypt.hash(password, 10);
            const verificationToken = token.generateToken();
            const verificationExpiry = new Date();
            verificationExpiry.setHours(verificationExpiry.getHours() + 5);
            const newUser = new UserModel({
                name,
                email,
                password: encryptedPassword,
                createdAt: new Date().toString().split(" ").splice(1,4).join(' '),
                urls: [],
                verificationToken,
                verificationTokenExpiry: verificationExpiry
            })

            await newUser.save()

            // sending verification email
            const verifyemail = await sendVerificationEmail(
                email,
                name,
                verificationToken
            )

            if(!verifyemail.success){
                return Response.json({
                    success: false,
                    message: "Failed to send verification email!"
                }, {status: 400})
            }
            
            return Response.json({
                success: true,
                message: "User created successfully, please confirm your email!"
            }, {status: 200})
        }
    } catch (error) {
        console.error('Something wents wrongs, ', error);
        return Response.json({
            success: false,
            message: "Something wents wrongs!"
        }, {status: 500})
        
    }
}