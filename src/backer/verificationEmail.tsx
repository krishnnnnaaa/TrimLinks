import { VerificationEmail } from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { resend } from "@/lib/resend";

export async function sendVerificationEmail(
    email: string,
    username: string,
    token: string
):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: 'Confirm your email address | TrimLinks',
            react: VerificationEmail({username, token}),
          });

        return {
            success: true,
            message:"Verification email sent successfully"
        }
    } catch (error) {
        console.log("Error in sending Verification email", error);
        return {
            success: false,
            message:"Error in sending Verification email"
        }
        
    }
}