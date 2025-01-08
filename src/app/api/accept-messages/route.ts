import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions); // Await the resolution of the Promise
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "User not autheticated!!",
      },
      {
        status: 401,
      }
    );
  }
  const userId = user._id;

  if (!userId) {
    return Response.json(
      {
        success: false,
        message: "User not autheticated!!",
      },
      {
        status: 401,
      }
    );
  }

  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User settings updated successfully",
        user: updatedUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Failed to update user settings", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update user settings",
      },
      {
        status: 500,
      }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions); // Await the resolution of the Promise
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "User not autheticated!!",
      },
      {
        status: 401,
      }
    );
  }
  const userId = user._id;

  if (!userId) {
    return Response.json(
      {
        success: false,
        message: "User not autheticated!!",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User found",
        isAcceptingMessages: user.isAcceptingMessages,
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Failed to get user", error);
    return Response.json(
      {
        success: false,
        message: "Failed to get user",
      },
      {
        status: 500,
      }
    );
  }
}
