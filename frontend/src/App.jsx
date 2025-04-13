import BestSellingBook from "./components/bestSellingBook/BestSellingBook";
import BooksWithOffer from "./components/books_with_offer/BooksWithOffer";
import FeaturedBooks from "./components/featured_books/FeaturedBooks";
import Footer from "./components/footer/Footer";
import LandingPage from "./components/landingPage/LandingPage";
import Navbar from "./components/navbar/Navbar";
import NewsLetter from "./components/newsletter/NewsLetter";
import PopularBooks from "./components/popular_books/PopularBooks";
import Cart from "./pages/cart/Cart";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LandingPage />
              <FeaturedBooks />
              <BestSellingBook />
              <PopularBooks />
              <BooksWithOffer />
              <NewsLetter />
            </>
          }
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      
      <Footer />
    </Router>
  );
};

export default App;
