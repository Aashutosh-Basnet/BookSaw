import books from "../Models/book.model.js";

const createProduct = async(req, res) => {
    try {
        const newProduct = new product(req.body);
        await newProduct.save();

        res.status(200).json({
            message: "Product created successfully",
            data: newProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Product creation failed",
            data: error,
        });
    }
}

const DeleteProduct = async(req, res) => {

}

const updateProduct = async(req, res) => {

}

export const getFeaturedBooks = async (req, res) => {
    try {
        const featuredBooks = await books.find()
            .sort({ average_rating: -1 })
            .limit(4);
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

