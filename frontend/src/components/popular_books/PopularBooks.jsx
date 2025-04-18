import { useState } from 'react';

const PopularBooks = () => {
    const [selectedGenre, setSelectedGenre] = useState("All genre");

    const genres = [
        {
            "genre": "All genre",
            "link": "link1",
        },
        {
            "genre": "Business",
            "link": "link1",
        },
        {
            "genre": "Technology",
            "link": "link1",
        },
        {
            "genre": "Romantic",
            "link": "link1",
        },
        {
            "genre": "Adventure",
            "link": "link1",
        },
        {
            "genre": "Fictional",
            "link": "link1",
        },
    ];

    const books = [
        {
            id: 1,
            title: "The Midnight Library",
            author: "Matt Haig",
            price: 24.99,
            genre: "Fictional",
            cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg"
        },
        {
            id: 2,
            title: "Atomic Habits",
            author: "James Clear",
            price: 27.99,
            genre: "Business",
            cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg"
        },
        {
            id: 3,
            title: "Project Hail Mary",
            author: "Andy Weir",
            price: 29.99,
            genre: "Adventure",
            cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg"
        },
        {
            id: 4,
            title: "Clean Code",
            author: "Robert C. Martin",
            price: 44.99,
            genre: "Technology",
            cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg"
        },
        {
            id: 5,
            title: "The Love Hypothesis",
            author: "Ali Hazelwood",
            price: 19.99,
            genre: "Romantic",
            cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1611937942i/56732449.jpg"
        },
        {
            id: 6,
            title: "Think and Grow Rich",
            author: "Napoleon Hill",
            price: 21.99,
            genre: "Business",
            cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1463241782i/30186948.jpg"
        },
    ];

    const filteredBooks = selectedGenre === "All genre" 
        ? books 
        : books.filter(book => book.genre === selectedGenre);

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col items-center my-20">
                <p className="text-navColor">SOME QUALITY ITEMS</p>
                <div className="flex items-center justify-center w-[70%]">
                    <div className="w-full border-t border-gray-400"></div>
                    <span className="px-4 text-gray-600 text-5xl font-merriweather whitespace-nowrap">Popular Books</span>
                    <div className="w-full border-t border-gray-400"></div>
                </div>
            </div>
            
            <div className="flex justify-center mb-12">
                <ul className="flex gap-8 flex-wrap">
                    {genres.map(({genre}, index) => (
                        <li 
                            key={index} 
                            className={`cursor-pointer px-4 py-2 rounded-full transition-all
                                ${selectedGenre === genre 
                                    ? 'bg-navColor text-white' 
                                    : 'hover:bg-gray-100'}`}
                            onClick={() => setSelectedGenre(genre)}
                        >
                            {genre}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {filteredBooks.map((book) => (
                    <div key={book.id} className="flex flex-col items-center p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                        <img 
                            src={book.cover} 
                            alt={book.title}
                            className="w-48 h-72 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold text-center">{book.title}</h3>
                        <p className="text-gray-600 mt-2">{book.author}</p>
                        <p className="text-navColor font-bold mt-2">${book.price}</p>
                        <button className="mt-4 bg-navColor text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PopularBooks;