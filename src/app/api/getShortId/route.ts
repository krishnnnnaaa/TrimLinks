import dbConnect from "@/lib/dbConnect";
import { UrlModel } from "@/model/User";


export async function POST(request: Request){
    dbConnect()
    
    try {
        const {shortId} = await request.json();
        const urlObj = await UrlModel.findOne({shortId});        
        return Response.json({
            success: true,
            message: "Url fetched successfully!",
            data: urlObj
        }, {status: 201})
    } catch (error) {
        return Response.json({
            success: false,
            message: "Sorry, couldn't get Url"
        }, {status: 500})
    }
}