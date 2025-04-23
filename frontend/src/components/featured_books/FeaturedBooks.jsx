import BookCard from "../ui/BookCard";
import { useBooks } from "../../hooks/useBooks";

const FeaturedBooks = () => {
    const { books, loading, error, hasMore, loadMore } = useBooks('featured');
    
    const handleLoadMore = () => {
        loadMore();
    };

    if (loading && books.length === 0) {
        return (
            <div className="min-h-[100vh] w-screen mt-20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-300"></div>
            </div>
        );
    }

    if (error && books.length === 0) {
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
            
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <BookCard 
                            key={book._id}
                            id={book._id}
                            title={book.title}
                            author={book.author ? book.author[0] : ''}
                            rating={book.average_rating}
                            thumbnail={book.thumbnail}
                            description={book.description}
                            price={book.price || 19.99}
                        />
                    ))}
                </div>
                
                {hasMore && (
                    <div className="flex justify-center mt-10">
                        <button 
                            className="bg-navColor text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors flex items-center"
                            onClick={handleLoadMore}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                                    Loading...
                                </>
                            ) : (
                                'Load More Books'
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeaturedBooks;