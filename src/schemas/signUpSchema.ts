import {z} from "zod";

export const nameValidation = z.string().min(2, 'Name must be atleast 2 characters').max(20, "Name must be exceed 20 characters");

export const signUpSchema = z.object({
    name: nameValidation,
    email: z.string().email({message: "Please check your email again"}),
    password: z.string().min(8, {message: "Password must be atleast 8 characters"})
})