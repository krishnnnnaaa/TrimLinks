import { sendPasswordResetEmail } from "@/backer/passwordresetmail";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import  bcrypt from 'bcryptjs'
import { ApiResponse } from "@/types/ApiResponse";

export async function POST(request:Request):Promise<ApiResponse>{
    await dbConnect()

    try {
        const { name, email, password} = await request.json();

        const existingUser = await UserModel.findOne(email);

        if(existingUser){
            return {
                success: false,
                message: "User already exists with this email"
            }
        }else{
            const encryptedPassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                name,
                email,
                password: encryptedPassword,
                createdAt: new Date().toString().split(" ").splice(1,4).join(' '),
                urls: []
            })

            await newUser.save()
        }
        return {
            success: false,
            message: "Something wents wrongs!"
        }
    } catch (error) {
        console.error('Something wents wrongs, ', error);
        return {
            success: false,
            message: "Something wents wrongs!"
        }
        
    }
}