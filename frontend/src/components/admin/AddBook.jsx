import { useState } from 'react';
import api from '../../api/axios';

const initialBookState = {
  title: '',
  subtitle: '',
  description: '',
  categories: [],
  author: [''],
  published_year: '',
  thumbnail: '',
  price: 0,
};

const AddBook = ({ onSuccess }) => {
  const [book, setBook] = useState(initialBookState);
  const [categoryInput, setCategoryInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setBook((prev) => ({ ...prev, price: value }));
      if (validationErrors.price) {
        setValidationErrors((prev) => ({ ...prev, price: null }));
      }
    }
  };

  const addCategory = () => {
    if (categoryInput.trim()) {
      setBook((prev) => ({
        ...prev,
        categories: [...prev.categories, categoryInput.trim()],
      }));
      setCategoryInput('');
    }
  };

  const removeCategory = (index) => {
    setBook((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index),
    }));
  };

  const addAuthor = () => {
    if (authorInput.trim()) {
      setBook((prev) => ({
        ...prev,
        author: [...prev.author.filter(a => a.trim()), authorInput.trim()],
      }));
      setAuthorInput('');
    }
  };

  const removeAuthor = (index) => {
    setBook((prev) => ({
      ...prev,
      author: prev.author.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this to a server and get a URL back
      // For this example, we'll use a local URL to simulate this
      const imageUrl = URL.createObjectURL(file);
      setBook((prev) => ({ ...prev, thumbnail: imageUrl }));
    }
  };

  const validate = () => {
    const errors = {};
    
    if (!book.title.trim()) errors.title = 'Title is required';
    if (!book.description.trim()) errors.description = 'Description is required';
    if (book.categories.length === 0) errors.categories = 'At least one category is required';
    if (book.author.filter(a => a.trim()).length === 0) errors.author = 'At least one author is required';
    if (!book.published_year) errors.published_year = 'Publication year is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      setLoading(true);
      setError(null);
      
      const bookData = {
        ...book,
        // Ensure price is a number
        price: parseFloat(book.price) || 0,
        // Format published_year as a date
        published_year: new Date(book.published_year).toISOString(),
      };
      
      await api.post('/books', bookData);
      
      // Clear form after successful submission
      setBook(initialBookState);
      setCategoryInput('');
      setAuthorInput('');
      
      // Notify parent component
      onSuccess();
    } catch (err) {
      console.error('Error adding book:', err);
      setError('Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Add New Book</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
              Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={book.title}
              onChange={handleInputChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navColor ${
                validationErrors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors.title && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
            )}
          </div>

          {/* Subtitle */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="subtitle">
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={book.subtitle}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navColor"
            />
          </div>

          {/* Description */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={book.description}
              onChange={handleInputChange}
              rows="4"
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navColor ${
                validationErrors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            ></textarea>
            {validationErrors.description && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
            )}
          </div>

          {/* Categories */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Categories*
            </label>
            <div className="flex">
              <input
                type="text"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                className="w-full border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navColor"
                placeholder="Enter a category"
              />
              <button
                type="button"
                onClick={addCategory}
                className="bg-navColor text-white px-4 rounded-r-md hover:bg-opacity-90"
              >
                Add
              </button>
            </div>
            {validationErrors.categories && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.categories}</p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {book.categories.map((category, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {category}
                  <button
                    type="button"
                    onClick={() => removeCategory(index)}
                    className="ml-2 text-gray-600 hover:text-red-500"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Authors */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Authors*
            </label>
            <div className="flex">
              <input
                type="text"
                value={authorInput}
                onChange={(e) => setAuthorInput(e.target.value)}
                className="w-full border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navColor"
                placeholder="Enter an author"
              />
              <button
                type="button"
                onClick={addAuthor}
                className="bg-navColor text-white px-4 rounded-r-md hover:bg-opacity-90"
              >
                Add
              </button>
            </div>
            {validationErrors.author && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.author}</p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {book.author.filter(a => a.trim()).map((author, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {author}
                  <button
                    type="button"
                    onClick={() => removeAuthor(index)}
                    className="ml-2 text-gray-600 hover:text-red-500"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Published Year and Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="published_year">
              Publication Year*
            </label>
            <input
              type="date"
              id="published_year"
              name="published_year"
              value={book.published_year}
              onChange={handleInputChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navColor ${
                validationErrors.published_year ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors.published_year && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.published_year}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
              Price ($)
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={book.price}
              onChange={handlePriceChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navColor"
              placeholder="19.99"
            />
          </div>

          {/* Thumbnail Image */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Cover Image
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              {book.thumbnail && (
                <div className="w-16 h-20 overflow-hidden">
                  <img src={book.thumbnail} alt="Book cover" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => onSuccess()}
            className="px-4 py-2 border border-gray-300 rounded-md mr-2 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-navColor text-white rounded-md hover:bg-opacity-90 flex items-center"
          >
            {loading && (
              <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
            )}
            {loading ? 'Adding...' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook; 