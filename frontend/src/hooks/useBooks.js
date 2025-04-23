import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books';

export const useBooks = (category, initialLimit = 4) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [limit] = useState(initialLimit);

    const fetchBooks = useCallback(async (isLoadMore = false) => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/${category}?page=${page}&limit=${limit}`);
            
            if (isLoadMore) {
                setBooks(prevBooks => [...prevBooks, ...response.data]);
            } else {
                setBooks(response.data);
            }
            
            // If we received fewer books than the limit, there are no more books to load
            setHasMore(response.data.length >= limit);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [category, page, limit]);

    // Initial load
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const loadMore = useCallback(() => {
        setPage(prevPage => prevPage + 1);
    }, []);

    // When page changes, fetch more books
    useEffect(() => {
        if (page > 1) {
            fetchBooks(true);
        }
    }, [page, fetchBooks]);

    return { books, loading, error, hasMore, loadMore };
}; 