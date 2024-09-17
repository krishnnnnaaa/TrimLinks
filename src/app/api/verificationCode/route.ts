import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

export async function POST(request: Request){
    await dbConnect()
    try {
         const {username, token } = await request.json()
         const userWithToken = await UserModel.findOne({username, verificationToken: token});
         if(!userWithToken){
            return Response.json({
                success: false,
                message: "Invalid Token"
            } , {status: 400})
         }else{
            if(new Date(userWithToken.verificationTokenExpiry) > new Date()){
                userWithToken.verified = true
                await userWithToken.save()

                return Response.json({
                    success: true,
                    message: "Email Address verified successfully!"
                } , {status: 201})
            }else{
                return Response.json({
                    success: false,
                    message: "Verification token has expired, please signup again to get a new one!"
                } , {status: 401})
            }
         }
    } catch (error) {
        return Response.json({
            success: false,
            message: "Error in verification email address"
        } , {status: 500})
    }
}