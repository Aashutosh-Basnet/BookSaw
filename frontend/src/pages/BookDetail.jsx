import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import api from "../api/axios";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "", name: "" });
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState({
    readBefore: "",
    format: "",
    recommend: "",
    feedback: ""
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        // Fetch book details
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
        
        // For demo purposes, generate some sample reviews
        const sampleReviews = [
          {
            id: 1,
            name: "John Doe",
            rating: 4.5,
            comment: "This book changed my perspective on life. The storytelling is incredible!",
            date: "2023-05-12"
          },
          {
            id: 2,
            name: "Jane Smith",
            rating: 5,
            comment: "Absolutely loved it! Couldn't put it down once I started reading.",
            date: "2023-06-21"
          },
          {
            id: 3,
            name: "Mike Johnson",
            rating: 3.5,
            comment: "Good book but a bit slow in the middle chapters.",
            date: "2023-07-05"
          }
        ];
        setReviews(sampleReviews);
        
        setError(null);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to load book details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleStarClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form
    if (!newReview.name.trim() || !newReview.comment.trim() || newReview.rating === 0) {
      alert("Please fill all fields and provide a rating");
      return;
    }
    
    // Add the new review to the list (in a real app, you would send this to the server)
    const reviewToAdd = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews([reviewToAdd, ...reviews]);
    
    // Reset the form
    setNewReview({ rating: 0, comment: "", name: "" });
  };

  const handleQuestionnaireChange = (e) => {
    const { name, value } = e.target;
    setQuestionnaireAnswers({ ...questionnaireAnswers, [name]: value });
  };

  const handleQuestionnaireSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would send this data to the server
    alert("Thank you for completing the questionnaire!");
    setShowQuestionnaire(false);
    setQuestionnaireAnswers({
      readBefore: "",
      format: "",
      recommend: "",
      feedback: ""
    });
  };

  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin w-12 h-12 border-4 border-navColor border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-red-500 text-center">
          <p className="text-2xl font-bold mb-2">Oops!</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">Book not found</p>
          <p>The book you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Book Details Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Book Cover */}
        <div className="md:w-1/3 lg:w-1/4">
          <img 
            src={book.thumbnail || "https://via.placeholder.com/300x450"} 
            alt={book.title}
            className="w-full max-w-xs mx-auto rounded-lg shadow-lg"
          />
        </div>
        
        {/* Book Info */}
        <div className="md:w-2/3 lg:w-3/4">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-lg text-gray-700 mb-4">by {book.author && book.author.join(', ')}</p>
          
          <div className="flex items-center mb-4">
            {renderStarRating(book.average_rating || 0)}
            <span className="ml-2 text-gray-600">
              ({book.rating_count || 0} ratings)
            </span>
          </div>
          
          <div className="mb-6">
            <p className="text-lg font-semibold mb-2">Categories:</p>
            <div className="flex flex-wrap gap-2">
              {book.categories && book.categories.map((category, index) => (
                <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {category}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-lg font-semibold mb-2">Description:</p>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button className="bg-navColor text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors">
              Add to Cart
            </button>
            <button 
              className="border-2 border-navColor text-navColor px-6 py-3 rounded-full hover:bg-navColor hover:text-white transition-colors"
              onClick={() => setShowQuestionnaire(true)}
            >
              Take Questionnaire
            </button>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Reviews</h2>
        
        {/* Review Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={newReview.name}
                onChange={handleReviewChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-navColor"
                placeholder="Enter your name"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating</label>
              <div className="flex gap-1 text-2xl cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    onClick={() => handleStarClick(star)}
                    className={star <= newReview.rating ? "text-yellow-400" : "text-gray-300"}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Review</label>
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleReviewChange}
                className="w-full p-2 border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-navColor"
                placeholder="Share your thoughts about this book"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="bg-navColor text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>
        
        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
                <div className="flex mb-2">
                  {renderStarRating(review.rating)}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Questionnaire Modal */}
      {showQuestionnaire && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Book Questionnaire</h3>
            <form onSubmit={handleQuestionnaireSubmit}>
              <div className="mb-4">
                <p className="font-medium mb-2">Have you read this book before?</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="readBefore"
                      value="yes"
                      checked={questionnaireAnswers.readBefore === "yes"}
                      onChange={handleQuestionnaireChange}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="readBefore"
                      value="no"
                      checked={questionnaireAnswers.readBefore === "no"}
                      onChange={handleQuestionnaireChange}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="font-medium mb-2">What format do you prefer to read in?</p>
                <select
                  name="format"
                  value={questionnaireAnswers.format}
                  onChange={handleQuestionnaireChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select format</option>
                  <option value="physical">Physical book</option>
                  <option value="ebook">eBook</option>
                  <option value="audiobook">Audiobook</option>
                </select>
              </div>
              
              <div className="mb-4">
                <p className="font-medium mb-2">Would you recommend this book to others?</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="recommend"
                      value="yes"
                      checked={questionnaireAnswers.recommend === "yes"}
                      onChange={handleQuestionnaireChange}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="recommend"
                      value="no"
                      checked={questionnaireAnswers.recommend === "no"}
                      onChange={handleQuestionnaireChange}
                      className="mr-2"
                    />
                    No
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="recommend"
                      value="maybe"
                      checked={questionnaireAnswers.recommend === "maybe"}
                      onChange={handleQuestionnaireChange}
                      className="mr-2"
                    />
                    Maybe
                  </label>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="font-medium mb-2">Any additional feedback?</p>
                <textarea
                  name="feedback"
                  value={questionnaireAnswers.feedback}
                  onChange={handleQuestionnaireChange}
                  className="w-full p-2 border rounded-md h-24 resize-none"
                  placeholder="Share your thoughts..."
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowQuestionnaire(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-navColor text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail; 