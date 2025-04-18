import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookRouter from "./router/book.router.js";
import dbConnect from "./dbConnect/dbConnection.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", bookRouter);

app.get("/", (req, res)=> {
    res.send("Server is running!");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dbConnect();
})