import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async() => {
    try{
        await mongoose.connect(process.env.CONNECTION_URL);
        console.log("Database has been connected successfully!");
    }catch (error) {
        console.log(error);
    }
}

export default dbConnect;