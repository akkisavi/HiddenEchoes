import { resend } from "@/lib/resend";
import EmailVerification from "../../emails/EmailVerification";
import { ApiResponse } from "@/types/ApiResponse.js";

export async function sendVerificationEmail(
    email: string,
    username: string, 
    verifyToken: string
    ): Promise<ApiResponse>{
        try {
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject: 'Hidden Echoes | Verification Code',
                react: EmailVerification({ username, otp: verifyToken}),
            });
            return { success: true, message: 'Verification email sent successfully.' };
        }catch (emailError) {
            console.error("Error sending verification email", emailError);
            return {success: false, message: "Error sending verification email"}
        }
    } 