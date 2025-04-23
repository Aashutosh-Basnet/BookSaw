import books from "../Models/book.model.js";

export const createBook = async(req, res) => {
    try {
        const newBook = new books(req.body);
        await newBook.save();

        res.status(201).json({
            message: "Book created successfully",
            data: newBook,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Book creation failed",
            error: error.message,
        });
    }
};

export const deleteBook = async(req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ message: "Book ID is required" });
        }
        
        const result = await books.findByIdAndDelete(id);
        
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        res.status(200).json({ 
            message: "Book deleted successfully",
            data: result 
        });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: error.message });
    }
};

export const updateBook = async(req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ message: "Book ID is required" });
        }
        
        const updatedBook = await books.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        res.status(200).json({
            message: "Book updated successfully",
            data: updatedBook
        });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getAllBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        // Get total count for pagination info
        const total = await books.countDocuments();
        
        // Get books with pagination
        const allBooks = await books.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
            
        res.status(200).json({
            books: allBooks,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
                limit
            }
        });
    } catch (error) {
        console.error("Error fetching all books:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getFeaturedBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;
        const skip = (page - 1) * limit;
        
        const featuredBooks = await books.find()
            .sort({ average_rating: -1 })
            .skip(skip)
            .limit(limit);
            
        res.status(200).json(featuredBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBestSellingBooks = async (req, res) => {
    try {
        const bestSellingBooks = await books.find({
            average_rating: { $gte: 4 }
        })
            .sort({ rating_count: -1 })
            .limit(4);
        res.status(200).json(bestSellingBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPopularBooks = async (req, res) => {
    try {
        const popularBooks = await books.find()
            .sort({ rating_count: -1, average_rating: -1 })
            .limit(4);
        res.status(200).json(popularBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        const book = await books.findById(id);
        
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        res.status(500).json({ message: error.message });
    }
};

export const searchBooks = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query || query.trim() === '') {
            return res.status(400).json({ message: "Search query is required" });
        }

        // Search in title, author, and description with case-insensitive matching
        const results = await books.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { categories: { $regex: query, $options: 'i' } }
            ]
        }).limit(10);

        res.status(200).json({ books: results });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ message: error.message });
    }
};

