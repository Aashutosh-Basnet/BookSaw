import BookCard from "../ui/BookCard";
import { useBooks } from "../../hooks/useBooks";

const FeaturedBooks = () => {
    const { books, loading, error } = useBooks('featured');

    if (loading) {
        return (
            <div className="min-h-[100vh] w-screen mt-20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-300"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-[100vh] w-screen mt-20 flex items-center justify-center">
                <p className="text-red-500">Error loading books: {error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-[100vh] w-screen mt-20">
            <div className="flex flex-col items-center">
                <p className="text-navColor">SOME QUALITY ITEMS</p>
                <div className="flex items-center justify-center w-[70%]">
                    <div className="w-full border-t border-gray-400"></div>
                    <span className="px-4 text-gray-600 text-5xl font-merriweather whitespace-nowrap">Featured Books</span>
                    <div className="w-full border-t border-gray-400"></div>
                </div>
            </div>
            <div className="flex items-center justify-center gap-4 m-10">
                <div className="flex flex-col md:flex-row gap-10">
                    {books.map((book) => (
                        <BookCard 
                            key={book._id}
                            title={book.title}
                            author={book.author[0]}
                            rating={book.average_rating}
                            thumbnail={book.thumbnail}
                            description={book.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedBooks;