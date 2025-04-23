import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookRouter from "./router/book.router.js";
import authRouter from "./router/auth.route.js";
import dbConnect from "./dbConnect/dbConnection.js";

dotenv.config();
const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Vite's default port
    credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/books", bookRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res)=> {
    res.send("Server is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dbConnect();
});