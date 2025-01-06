import mongoose, {Schema, Document} from "mongoose";

export interface Message extends mongoose.Document{
    content: string,
    createdAt: Date,
}

const MessageSchema : Schema<Message> = new Schema({    
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifyToken: string,
    verifyTokenExpiration: Date,
    isVerified: boolean,
    isAcceptingMessages: boolean,
    messages: Message[],
}

const UserSchema : Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please add a valid email",
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyToken: {
        type: String,
        required: true,
    },
    verifyTokenExpiration: {
        type: Date,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema],
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);   

export default UserModel;
