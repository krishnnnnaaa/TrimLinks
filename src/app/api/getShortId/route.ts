import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";


export async function GET(request: Request){
    dbConnect()

    try {
        // todo
    } catch (error) {
        return Response.json({
            success: false,
            message: "Sorry, couldn't get Urls"
        }, {status: 500})
    }
}