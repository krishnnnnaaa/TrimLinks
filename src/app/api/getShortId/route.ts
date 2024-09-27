import dbConnect from "@/lib/dbConnect";
import { UrlModel, UserModel } from "@/model/User";


export async function POST(request: Request){
    await dbConnect()
    
    try {
        const {shortId, userId} = await request.json();
        
        if(shortId && userId){

            const urlObj = await UrlModel.findOneAndUpdate({shortId}, { $inc: { views: 1 } });
            await UserModel.updateOne({_id: userId,'urls.shortId': shortId,}, {$inc: {'urls.$.views': 1}});``
            
            return Response.json({
                success: true,
                message: "Url fetched successfully!",
                data: urlObj
            }, {status: 201})
        }
    } catch (error) {
        return Response.json({
            success: false,
            message: "Sorry, couldn't get Url"
        }, {status: 500})
    }
}