import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Search from "../search/Search";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { BsCartDash } from "react-icons/bs";

const Topbar = () => {
    const socials = [
        {
          social: <FaFacebook />,
          link: "https://facebook.com",
        },
        {
          social: <FaXTwitter />,
          link: "https://twitter.com",
        },
        {
          social: <FaYoutube />,
          link: "https://youtube.com",
        },
        {
          social: <FaGithub />,
          link: "https://github.com",
        },
      ];
  return (
    <div className="w-screen border-b-1 border-slate-300 flex flex-col sm:flex-row justify-between">
        <div className="flex gap-4 p-3 sm:p-5 pb-4 sm:pb-8 text-md">
            {
                socials.map(({social, link}, index)=> (
                   <a href={link} key={index} className="hover:text-amber-300 transition-colors duration-300">{social}</a>
                ))
            }
        </div>
        <div className="flex p-3 sm:p-5 gap-3 sm:gap-5 mr-3 sm:mr-5 flex-wrap justify-center sm:justify-end">
            <div className="flex items-center gap-2 cursor-pointer hover:text-amber-300 transition-colors duration-300"><RiAccountPinCircleLine />Account</div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-amber-300 transition-colors duration-300"><BsCartDash />Cart</div>
            <Search/>
        </div>
    </div>
  )
}

export default Topbar