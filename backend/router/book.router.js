import express from "express";
import { getFeaturedBooks, getBestSellingBooks, getPopularBooks } from "../controller/book.controller.js";

const router = express.Router();

router.get("/featured", getFeaturedBooks);
router.get("/best-selling", getBestSellingBooks);
router.get("/popular", getPopularBooks);

export default router;