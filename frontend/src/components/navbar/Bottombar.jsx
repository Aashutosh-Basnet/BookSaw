import { Link } from 'react-scroll';

const Bottombar = () => {
    const navLists = [
        { "text": "HOME", "to": "home" },
        { "text": "PAGES", "to": "pages" },
        { "text": "FEATURED", "to": "featured" },
        { "text": "POPULAR", "to": "popular" },
        { "text": "OFFER", "to": "offer" },
        { "text": "ARTICLES", "to": "articles" },
        { "text": "DOWNLOAD APP", "to": "download" },
        { "text": "Login/register", "to": "loginRegister" },
    ];

  return (
    <div className="w-screen border-b-1 border-slate-300">
        <div className="p-4">
            <h1 className="font-merriweather text-4xl font-extralight"><b className="font-semibold">BOOK</b>SAW</h1>
        </div>
        <div>
            {
                navLists.map(({ text, to }, index) => {
                    return (
                        <Link key={index} to={to} smooth={true} duration={300} className="px-4 py-2">
                            {text}
                        </Link>
                    );
                })
            }
        </div>
    </div>
  );
}

export default Bottombar;
