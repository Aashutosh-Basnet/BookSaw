import express from "express";
import { 
  getFeaturedBooks, 
  getBestSellingBooks, 
  getPopularBooks, 
  searchBooks, 
  getBookById,
  getAllBooks,
  createBook,
  updateBook,
  deleteBook
} from "../controller/book.controller.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Public routes
router.get("/featured", getFeaturedBooks);
router.get("/best-selling", getBestSellingBooks);
router.get("/popular", getPopularBooks);
router.get("/search", searchBooks);
router.get("/:id", getBookById);

// Admin routes (protected)
router.get("/", getAllBooks); // This can be public, but we might want to add pagination info only for admins
router.post("/", adminAuth, createBook);
router.put("/:id", adminAuth, updateBook);
router.delete("/:id", adminAuth, deleteBook);

export default router;