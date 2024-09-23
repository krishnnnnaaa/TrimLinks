import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";


export async function POST(request: Request){
    dbConnect()

    
    try {
        const {email} = await request.json();

        const user = await UserModel.findOne({email: email});
        console.log(email);
        
        
        return Response.json({
            success: true,
            message: "Urls fetched successfully!",
            data: user && user.urls
        }, {status: 201})
    } catch (error) {
        return Response.json({
            success: false,
            message: "Sorry, couldn't get Urls"
        }, {status: 500})
    }
}