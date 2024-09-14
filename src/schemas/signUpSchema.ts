import {z} from "zod";

export const usernameValidation = z.string().min(2, 'Username must be atleast 2 characters').max(20, "Username must be exceed 20 characters");

export const signUpSchema = z.object({
    username:usernameValidation,
    email: z.string().email({message: "Please check your email again"}),
    password: z.string().min(8, {message: "Password must be atleast 8 characters"})
})