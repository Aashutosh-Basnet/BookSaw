import { Link } from 'react-scroll';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Bottombar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const navLists = [
        { "text": "HOME", "to": "home" },
        { "text": "PAGES", "to": "pages" },
        { "text": "FEATURED", "to": "featured" },
        { "text": "POPULAR", "to": "popular" },
        { "text": "OFFER", "to": "offer" },
        { "text": "ARTICLES", "to": "articles" },
        { "text": "LOGIN/REGISTER", "to": "loginRegister" },
    ];

  return (
    <div className="w-screen border-b-1 border-slate-300">
        <div className='flex justify-between items-center'>
            <div className="p-4">
                <h1 className="font-merriweather text-3xl sm:text-4xl font-extralight"><b className="font-semibold">BOOK</b>SAW</h1>
            </div>
            
            {/* Mobile menu button */}
            <button 
                className="p-4 md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className='hidden md:flex p-4 text-navColor'>
                {
                    navLists.map(({ text, to }, index) => {
                        return (
                            <Link key={index} to={to} smooth={true} duration={300} className="px-4 py-2 hover:text-amber-300 cursor-pointer transition-colors duration-300">
                                {text}
                            </Link>
                        );
                    })
                }
            </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white`}>
            <div className='flex flex-col p-4 text-navColor'>
                {
                    navLists.map(({ text, to }, index) => {
                        return (
                            <Link 
                                key={index} 
                                to={to} 
                                smooth={true} 
                                duration={300} 
                                className="px-4 py-3 hover:text-amber-300 cursor-pointer transition-colors duration-300 border-b border-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {text}
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    </div>
  );
}

export default Bottombar;
