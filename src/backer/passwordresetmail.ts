import ResetPasswordEmail from "../../emails/passwordResetEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { resend } from "@/lib/resend";

export async function sendPasswordResetEmail(
    email: string,
    name:string,
    token:string
):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: 'TrimLinks Accound Passeword Reset',
            react: ResetPasswordEmail({name, token, email}),
          });

        return {
            success: true,
            message:"Password Reset email sent successfully"
        }
    } catch (error) {
        console.log("Error in sending Password Reset email", error);
        return {
            success: false,
            message:"Error in sending Password Reset email"
        }
        
    }
}