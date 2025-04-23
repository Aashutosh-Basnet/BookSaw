import { useState, useEffect } from 'react';
import api from '../../api/axios';

const EditBook = ({ book, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    categories: [],
    author: [''],
    published_year: '',
    thumbnail: '',
    price: 0,
  });
  const [categoryInput, setCategoryInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (book) {
      // Format the date for the input (YYYY-MM-DD)
      let publishedYear = '';
      try {
        if (book.published_year) {
          const date = new Date(book.published_year);
          publishedYear = date.toISOString().split('T')[0];
        }
      } catch (err) {
        console.error('Error formatting date:', err);
      }

      setFormData({
        ...book,
        published_year: publishedYear,
        price: book.price || 0,
      });
    }
  }, [book]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setFormData((prev) => ({ ...prev, price: value }));
      if (validationErrors.price) {
        setValidationErrors((prev) => ({ ...prev, price: null }));
      }
    }
  };

  const addCategory = () => {
    if (categoryInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        categories: [...(prev.categories || []), categoryInput.trim()],
      }));
      setCategoryInput('');
    }
  };

  const removeCategory = (index) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index),
    }));
  };

  const addAuthor = () => {
    if (authorInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        author: [...(prev.author || []).filter(a => a.trim()), authorInput.trim()],
      }));
      setAuthorInput('');
    }
  };

  const removeAuthor = (index) => {
    setFormData((prev) => ({
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
      setFormData((prev) => ({ ...prev, thumbnail: imageUrl }));
    }
  };

  const validate = () => {
    const errors = {};
    
    if (!formData.title?.trim()) errors.title = 'Title is required';
    if (!formData.description?.trim()) errors.description = 'Description is required';
    if (!formData.categories?.length) errors.categories = 'At least one category is required';
    if (!formData.author?.filter(a => a.trim()).length) errors.author = 'At least one author is required';
    if (!formData.published_year) errors.published_year = 'Publication year is required';
    
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
        ...formData,
        // Ensure price is a number
        price: parseFloat(formData.price) || 0,
        // Format published_year as a date
        published_year: new Date(formData.published_year).toISOString(),
      };
      
      await api.put(`/books/${book._id}`, bookData);
      
      // Notify parent component of success
      onSuccess();
    } catch (err) {
      console.error('Error updating book:', err);
      setError('Failed to update book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!book) {
    return <div>No book selected for editing</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Edit Book</h2>
      
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
              value={formData.title || ''}
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
              value={formData.subtitle || ''}
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
              value={formData.description || ''}
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
              {formData.categories?.map((category, index) => (
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
              {formData.author?.filter(a => a.trim()).map((author, index) => (
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
              value={formData.published_year || ''}
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
              value={formData.price || ''}
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
              {formData.thumbnail && (
                <div className="w-16 h-20 overflow-hidden">
                  <img src={formData.thumbnail} alt="Book cover" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={onCancel}
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
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook; 