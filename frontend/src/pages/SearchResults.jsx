import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import BookCard from "../components/ui/BookCard";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchBooks = async () => {
      if (!query.trim()) {
        setBooks([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.get(`/books/search?query=${query}`);
        setBooks(response.data.books || []);
        setError(null);
      } catch (err) {
        console.error("Error searching books:", err);
        setError("Failed to load search results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    searchBooks();
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin w-12 h-12 border-4 border-navColor border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {query ? `Search Results for "${query}"` : "Search Results"}
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {!loading && books.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">No books found matching "{query}"</p>
          <p className="text-gray-500">Try using different keywords or browse our featured books.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book._id}
            id={book._id}
            title={book.title}
            author={book.author[0]}
            rating={book.average_rating || 0}
            thumbnail={book.thumbnail}
            description={book.description}
            price={book.price || 19.99}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults; 