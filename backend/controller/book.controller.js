import books from "../Models/book.model";

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

