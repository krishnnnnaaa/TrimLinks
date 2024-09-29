import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

export async function GET(request: Request){
    dbConnect()

    try {
        
        const {searchParams} = new URL(request.url)

        const queryParams = {
            username : searchParams.get('username')
        }
        
        
        const userWithThisName = await UserModel.findOne({username: queryParams.username})
        

        if(userWithThisName){
            return Response.json({
                success: false,
                message: "Username is already taken!"
            }, {status: 400})
        }else{
            return Response.json({
                success: true,
                message: "Username is available!"
            })
        }
    } catch (error) {
        return Response.json({
            success: false,
            message: "Error in checking name"
        } , {status: 500})
    }
}