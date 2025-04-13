import express from "express";
import dbConnect from "./dbConnect/dbConnection.js";

const app = express();

app.get("/", (req, res)=> {
    res.send("Server is running!");
})

app.listen(3000, () => {
    console.log("server is running on 3000.");
    dbConnect();
})