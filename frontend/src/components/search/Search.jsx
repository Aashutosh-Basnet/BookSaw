import { useState, useRef, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useDebounce } from "../../hooks/useDebounce";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  
  // Debounce search term to avoid making API calls on every keystroke
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search books when debounced search term changes
  useEffect(() => {
    const searchBooks = async () => {
      if (debouncedSearchTerm.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await api.get(`/books/search?query=${debouncedSearchTerm}`);
        setSearchResults(response.data.books || []);
      } catch (error) {
        console.error("Error searching books:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    searchBooks();
  }, [debouncedSearchTerm]);

  const handleSearchClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        document.getElementById("searchInput")?.focus();
      }, 100);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      {isOpen ? (
        <div className="absolute right-0 top-0 z-20 bg-white rounded-lg shadow-lg w-80 max-w-[90vw] overflow-hidden transition-all">
          <form onSubmit={handleSubmit} className="relative">
            <input
              id="searchInput"
              type="text"
              placeholder="Search for books..."
              value={searchTerm}
              onChange={handleInputChange}
              className="w-full p-3 pr-10 text-gray-700 border-b outline-none"
            />
            <button
              type="submit"
              className="absolute right-3 top-3 text-gray-500 hover:text-navColor"
            >
              <IoSearch size={20} />
            </button>
          </form>
          
          {loading && (
            <div className="p-4 text-center">
              <div className="animate-spin w-6 h-6 border-2 border-navColor border-t-transparent rounded-full mx-auto"></div>
            </div>
          )}
          
          {!loading && searchTerm.length >= 2 && searchResults.length > 0 && (
            <ul className="max-h-72 overflow-y-auto">
              {searchResults.map((book) => (
                <li
                  key={book._id}
                  onClick={() => handleBookClick(book._id)}
                  className="p-3 border-b hover:bg-gray-50 cursor-pointer flex items-center"
                >
                  <div className="w-10 h-14 mr-3 flex-shrink-0">
                    <img
                      src={book.thumbnail || "https://via.placeholder.com/40x56"}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{book.title}</p>
                    <p className="text-sm text-gray-500 truncate">by {book.author[0]}</p>
                  </div>
                </li>
              ))}
              <li className="p-3 text-center">
                <button
                  onClick={() => {
                    navigate(`/search?query=${searchTerm}`);
                    setIsOpen(false);
                  }}
                  className="text-navColor hover:underline text-sm"
                >
                  View all results
                </button>
              </li>
            </ul>
          )}
          
          {!loading && searchTerm.length >= 2 && searchResults.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No books found matching "{searchTerm}"
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={handleSearchClick}
          className="pt-1 cursor-pointer text-2xl hover:text-navColor transition-colors"
        >
          <IoSearch />
        </div>
      )}
    </div>
  );
};

export default Search;