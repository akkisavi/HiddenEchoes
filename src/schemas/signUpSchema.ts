import {z} from "zod";

export const usernameValidation = z.string().min(3).max(20).regex(/^[a-zA-Z0-9]*$/,"Username must not contain special character");


export const signUpSchema = z.object({  
    username: usernameValidation,
    email: z.string().email({message:"Email is not valid"}),
    password: z.string().min(6,{message:"Password must be at least 6 characters long"}).max(20,{message:"Password can be at most 20 characters long"}),
});