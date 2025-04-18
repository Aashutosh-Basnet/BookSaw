import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/books';

export const useBooks = (category) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/${category}`);
                setBooks(response.data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [category]);

    return { books, loading, error };
}; 