import dbConnect from "@/lib/dbConnect";
import { nameValidation } from "@/schemas/signUpSchema"
import { z } from "zod";

const nameSchema = z.object({
    name: nameValidation,
})

export async function GET(request: Request){
    dbConnect()

    try {
        const {searchParams} = new URL(request.url)

        const queryParams = {
            username : searchParams.get('name')
        }

        // Validation of name from zod

        const result = nameSchema.safeParse(queryParams);

        if(!result.success){
            return Response.json({
                success: false,
                message: "Please input valid username!"
            }, {status: 400})
        }else{
            return Response.json({
                success: true,
                message: "Userame is available!"
            })
        }
    } catch (error) {
        return Response.json({
            success: false,
            message: "Error in checking name"
        } , {status: 500})
    }
}