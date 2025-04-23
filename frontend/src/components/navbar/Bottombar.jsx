import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Bottombar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    
    const navLists = [
        { "text": "HOME", "to": "/", "type": "route" },
        { "text": "BOOKS", "to": "/search", "type": "route" },
        { "text": "FEATURED", "to": "/search?category=featured", "type": "route" },
        { "text": "POPULAR", "to": "/search?category=popular", "type": "route" },
        { "text": "OFFERS", "to": "/search?category=offer", "type": "route" },
        { "text": "ORDERS", "to": "/orders", "type": "route" },
    ];

    const handleLogout = () => {
        logout();
    };

    const renderAuthLinks = () => {
        if (user) {
            return (
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 hover:text-amber-300 cursor-pointer transition-colors duration-300"
                >
                    LOGOUT
                </button>
            );
        }
        return (
            <>
                <RouterLink to="/login" className="px-4 py-2 hover:text-amber-300 cursor-pointer transition-colors duration-300">
                    LOGIN
                </RouterLink>
                <RouterLink to="/signup" className="px-4 py-2 hover:text-amber-300 cursor-pointer transition-colors duration-300">
                    REGISTER
                </RouterLink>
            </>
        );
    };

    return (
        <div className="w-screen border-b-1 border-slate-300">
            <div className='flex justify-between items-center'>
                <div className="p-4">
                    <h1 className="font-merriweather text-3xl sm:text-4xl font-extralight">
                        <b className="font-semibold">BOOK</b>SAW
                    </h1>
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
                    {navLists.map(({ text, to, type }, index) => {
                        return type === "scroll" ? (
                            <ScrollLink 
                                key={index} 
                                to={to} 
                                smooth={true} 
                                duration={300} 
                                className="px-4 py-2 hover:text-amber-300 cursor-pointer transition-colors duration-300"
                            >
                                {text}
                            </ScrollLink>
                        ) : (
                            <RouterLink 
                                key={index} 
                                to={to} 
                                className="px-4 py-2 hover:text-amber-300 cursor-pointer transition-colors duration-300"
                            >
                                {text}
                            </RouterLink>
                        );
                    })}
                    {renderAuthLinks()}
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white`}>
                <div className='flex flex-col p-4 text-navColor'>
                    {navLists.map(({ text, to, type }, index) => {
                        return type === "scroll" ? (
                            <ScrollLink 
                                key={index} 
                                to={to} 
                                smooth={true} 
                                duration={300} 
                                className="px-4 py-3 hover:text-amber-300 cursor-pointer transition-colors duration-300 border-b border-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {text}
                            </ScrollLink>
                        ) : (
                            <RouterLink 
                                key={index} 
                                to={to} 
                                className="px-4 py-3 hover:text-amber-300 cursor-pointer transition-colors duration-300 border-b border-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {text}
                            </RouterLink>
                        );
                    })}
                    <div className="border-b border-gray-100">
                        {renderAuthLinks()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bottombar;
