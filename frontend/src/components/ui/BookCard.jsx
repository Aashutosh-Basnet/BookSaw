import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const BookCard = ({ title, author, rating, thumbnail, description, price, id }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart, cartMessage, clearMessage, setCartMessage } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    // Clear any existing messages when component mounts
    useEffect(() => {
        clearMessage();
    }, [clearMessage]);
    
    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevent navigation to detail page when clicking Add to Cart
        
        // Verify auth state from both context and localStorage
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        const isAuthenticated = user || (token && storedUser);
        
        if (!isAuthenticated) {
            addToCart(null); // This will set the error message in the cart context
            return;
        }
        
        const success = addToCart({
            id,
            title,
            author,
            price,
            cover: thumbnail,
            originalPrice: price * 1.2 // Just for display purposes, assuming original price is 20% higher
        });
        
        if (success) {
            // Reset message after 3 seconds
            setTimeout(() => {
                clearMessage();
            }, 3000);
            
            // Navigate to cart page
            navigate("/cart");
        } else {
            // Reset error message after 3 seconds
            setTimeout(() => {
                clearMessage();
            }, 3000);
        }
    };
    
    const handleBookClick = () => {
        navigate(`/book/${id}`);
    };
    
    return (
        <div 
            className="w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleBookClick}
        >
            <div className="h-64 overflow-hidden">
                <img 
                    src={thumbnail || "https://via.placeholder.com/150"} 
                    alt={title}
                    className="w-full h-full object-cover"
                />
                {isHovered && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={handleAddToCart}
                                className="bg-navColor text-white px-4 py-2 rounded-full font-bold hover:bg-opacity-90 transition-colors"
                            >
                                Add to Cart
                            </button>
                            <button 
                                onClick={handleBookClick}
                                className="bg-white text-navColor px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3>
                <p className="text-sm text-gray-600 mb-2">by {author}</p>
                <div className="flex items-center mb-2">
                    <FaStar className="text-amber-300 mr-1" />
                    <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
                {price && (
                    <div className="mt-2 text-navColor font-semibold">${price.toFixed(2)}</div>
                )}
            </div>
            
            {cartMessage && (
                <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md z-50 ${cartMessage.includes('Please log in') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {cartMessage}
                </div>
            )}
        </div>
    );
};

export default BookCard;