import mongoose from "mongoose";
import { Schema } from "mongoose";

const userModel = new Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    
});

const User = mongoose("User", userModel);
export default userModel;
