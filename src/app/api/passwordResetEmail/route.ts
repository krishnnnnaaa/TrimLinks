import { sendPasswordResetEmail } from "@/backer/passwordresetmail";
import dbConnect from "@/lib/dbConnect";
import { User, UserModel } from "@/model/User";
import { createTokenGenerator } from "cybertoken";


export async function POST(request:Request){
    await dbConnect();

    const {email} = await request.json();
    
    console.log(email); 

    try {
    const user = await UserModel.findOne({email});
    console.log(user);
    
    
    
    if(!user){
        return Response.json({
            success: false,
            message: "User not found with this email"
        } , {status: 404})
    }


    const token = createTokenGenerator({
        prefixWithoutUnderscore: "resetme",
    })

    
    const resetPasswordToken = token.generateToken();
    const resetPasswordTokenExpiry = new Date();
    resetPasswordTokenExpiry.setHours(resetPasswordTokenExpiry.getHours() + 2);

    user.passwordResetToken = resetPasswordToken;
    user.passwordResetTokenExpiry = resetPasswordTokenExpiry;

    await user.save()

    // sending password Reset email
    const passwordResetMail = await sendPasswordResetEmail(
        email,
        user.username,
        resetPasswordToken
      );

      if (!passwordResetMail.success) {
        return Response.json(
          {
            success: false,
            message: "Failed to send password reset email!",
          },
          { status: 400 }
        );
      }

    return Response.json({
        success: false,
        message: "Password Reset mail successfully sent!."
    } , {status: 201})

        
    } catch (error) {
        return Response.json({
            success: false,
            message: "Error in sending Password Reset mail."
        } , {status: 500})
    }
}