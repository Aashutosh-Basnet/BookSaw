import { Link } from 'react-scroll';

const Bottombar = () => {
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
        <div className='flex justify-between'>

        <div className="p-4">
            <h1 className="font-merriweather text-4xl font-extralight"><b className="font-semibold">BOOK</b>SAW</h1>
        </div>
        <div className='p-4 flex text-navColor'>
            {
                navLists.map(({ text, to }, index) => {
                    return (
                        <Link key={index} to={to} smooth={true} duration={300} className="px-4 py-2 hover:text-hoverColor cursor-pointer">
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
