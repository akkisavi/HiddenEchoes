import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();

    try {

        const { username, code} = await request.json();

        const decodedUsername = decodeURIComponent(username)

        const user = await UserModel.findOne({ username: decodedUsername });

        if(!user){
            return Response.json(
                {
                  success: false,
                  message: "User not found",
                },
                { status: 404 }
            )
        }

        const isCodeValid = user.verifyToken === code 
        const isCodeExpired = new Date(user.verifyTokenExpiration) > new Date();

        if(isCodeValid && isCodeExpired){

            user.isVerified = true
            await user.save();
            
            return Response.json(
                {
                  success: true,
                  message: "Account verified succesfully",
                },
                { status: 200 }
            )
        }else if(!isCodeExpired){
            return Response.json(
                {
                  success: false,
                  message: "Verification code is expired. Please sign-up again",
                },
                { status: 400 }
            )
        }else{
            return Response.json(
                {
                  success: false,
                  message: "Verification code is incorrect",
                },
                { status: 200 }
            )
        }
        
    } catch (error) {
        console.error("Error verifying user", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying user",
      },
      { status: 500 }
    );
    }
}