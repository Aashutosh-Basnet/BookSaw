import BestSellingBook from "./components/bestSellingBook/BestSellingBook";
import BooksWithOffer from "./components/books_with_offer/BooksWithOffer";
import FeaturedBooks from "./components/featured_books/FeaturedBooks";
import Footer from "./components/footer/Footer";
import LandingPage from "./components/landingPage/LandingPage";
import Navbar from "./components/navbar/Navbar";
import NewsLetter from "./components/newsletter/NewsLetter";
import PopularBooks from "./components/popular_books/PopularBooks";
import Cart from "./pages/cart/Cart";
import BookDetail from "./pages/BookDetail";
import SearchResults from "./pages/SearchResults";
import Dashboard from "./pages/admin/Dashboard";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import PaymentSuccess from './pages/payment/success';
import PaymentFailure from './pages/payment/failure';
import Orders from './pages/orders/Orders';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Admin Routes - No Navbar/Footer */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Public Routes with Navbar and Footer */}
            <Route 
              path="*" 
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<><LandingPage /><FeaturedBooks /><BooksWithOffer /><BestSellingBook /><PopularBooks /><NewsLetter /></>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/book/:id" element={<BookDetail />} />
                    <Route path="/search" element={<SearchResults />} />
                    
                    {/* Protected Routes */}
                    <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                    <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                    
                    {/* Payment Routes */}
                    <Route path="/payment/success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
                    <Route path="/payment/failure" element={<PaymentFailure />} />
                  </Routes>
                  <Footer />
                </>
              } 
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
