import mongoose from "mongoose";
import { Schema } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    published_year: {
        type: Date,
        requried: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    rating_count: {
        type: Number,
        default: 0,
    },
    num_pages: {
        type: Number,
        default: 0,
    },
})

const books = mongoose.model("books", bookSchema);
export default books;