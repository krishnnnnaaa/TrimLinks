import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { z } from "zod";
import bcrpyt from 'bcryptjs'

export async function POST(request:Request){
    await dbConnect()

    try {
        const {email, password, resetToken} = await request.json()
        const user = await UserModel.findOne({email, passwordResetToken: resetToken, passwordResetTokenExpiry: { $gt: new Date()}})

        if(!user){
            return Response.json({
                success: false,
                message: "Invalid Token"
            } , {status: 404})
        }else{
            if(user.passwordResetTokenExpiry && user.passwordResetTokenExpiry > new Date()){

                const newEncryptedPassword = await bcrpyt.hash(password, 10)
                
                user.password = newEncryptedPassword;
                user.passwordResetToken = null;
                user.passwordResetTokenExpiry = null;
                
                await user.save()

                return Response.json({
                    success: true,
                    message: "Password has been reset succesfully"
                } , {status: 201})
            }else{
                console.log(user.passwordResetTokenExpiry && user.passwordResetTokenExpiry < new Date());
                
                return Response.json({
                    success: false,
                    message: "Password reset token has expired"
                } , {status: 400})
            }

        }
            
        } catch (error) {
        return Response.json({
            success: false,
            message: "Error in Resetting Password"
        } , {status: 500})
    }
}