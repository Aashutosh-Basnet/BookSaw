import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async() => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/booksaw');
        console.log("Database has been connected successfully!");
    }catch (error) {
        console.log(error);
    }
}

export default dbConnect;