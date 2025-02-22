import BestSellingBook from "./components/bestSellingBook/BestSellingBook"
import BooksWithOffer from "./components/books_with_offer/BooksWithOffer"
import FeaturedBooks from "./components/featured_books/FeaturedBooks"
import Footer from "./components/footer/Footer"
import LandingPage from "./components/landingPage/LandingPage"
import Navbar from "./components/navbar/Navbar"
import NewsLetter from "./components/newsletter/NewsLetter"
import PopularBooks from "./components/popular_books/PopularBooks"

const App = () => {
  return (
    <div className="bg-sitebg overflow-x-hidden">
      <Navbar/>
      <LandingPage/>
      <FeaturedBooks/>
      <BestSellingBook/>
      <PopularBooks/>
      <BooksWithOffer/>
      <NewsLetter/>
      <Footer/>
    </div>
  )
}

export default App