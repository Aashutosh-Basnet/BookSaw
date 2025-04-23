import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BooksWithOffer = () => {
  const [hoveredBook, setHoveredBook] = useState(null);
  const navigate = useNavigate();

  const booksWithOffers = [
    {
      id: 1,
      title: "Tomorrow, and Tomorrow, and Tomorrow",
      author: "Gabrielle Zevin",
      originalPrice: 28.99,
      discountedPrice: 19.99,
      discount: 31,
      cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1636978687i/58784475.jpg",
      badge: "Deal of the Day"
    },
    {
      id: 2,
      title: "Lessons in Chemistry",
      author: "Bonnie Garmus",
      originalPrice: 29.99,
      discountedPrice: 18.99,
      discount: 37,
      cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1634748496i/58065033.jpg",
      badge: "Best Offer"
    },
    {
      id: 3,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      originalPrice: 24.99,
      discountedPrice: 14.99,
      discount: 40,
      cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1664458703i/32620332.jpg",
      badge: "Flash Sale"
    },
    {
      id: 4,
      title: "Fourth Wing",
      author: "Rebecca Yarros",
      originalPrice: 27.99,
      discountedPrice: 16.99,
      discount: 39,
      cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1681752816i/61431922.jpg",
      badge: "Limited Time"
    }
  ];

  const handleViewDetails = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-merriweather mb-4">Special Offers</h2>
        <p className="text-navColor">Discover amazing deals on bestselling books</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {booksWithOffers.map((book) => (
          <div 
            key={book.id}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            onMouseEnter={() => setHoveredBook(book.id)}
            onMouseLeave={() => setHoveredBook(null)}
            onClick={() => handleViewDetails(book.id)}
          >
            {/* Offer Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {book.badge}
              </span>
            </div>

            {/* Discount Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                {book.discount}% OFF
              </span>
            </div>

            {/* Book Cover */}
            <div className="relative h-[400px]">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              
              {/* Hover Overlay */}
              {hoveredBook === book.id && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
                  <button 
                    className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(book.id);
                    }}
                  >
                    View Details
                  </button>
                </div>
              )}
            </div>

            {/* Book Info */}
            <div className="p-6">
              <h3 className="font-merriweather text-xl mb-2 line-clamp-2">{book.title}</h3>
              <p className="text-navColor mb-4">{book.author}</p>
              
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-navColor">
                  ${book.discountedPrice}
                </span>
                <span className="text-gray-500 line-through">
                  ${book.originalPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Offers Button */}
      <div className="text-center mt-12">
        <button className="bg-navColor text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors inline-flex items-center gap-2">
          View All Offers
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BooksWithOffer;