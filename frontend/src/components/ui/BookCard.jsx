import { FaStar } from "react-icons/fa";

const BookCard = ({ title, author, rating, thumbnail, description }) => {
    console.log(thumbnail);
    console.log(title);
    console.log(author);
    console.log(rating);
    console.log(description);
    return (
        <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-64 overflow-hidden">
                <img 
                    src={thumbnail || "https://via.placeholder.com/150"} 
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3>
                <p className="text-sm text-gray-600 mb-2">by {author}</p>
                <div className="flex items-center mb-2">
                    <FaStar className="text-amber-300 mr-1" />
                    <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
            </div>
        </div>
    );
};

export default BookCard;