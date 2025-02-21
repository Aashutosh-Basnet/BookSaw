import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

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
    <div className="w-screen border-b-1 border-slate-300">
        <div className="flex gap-4 p-5 pb-8 text-md">
            {
                socials.map(({social, link}, index)=> (
                   <a href={link} key={index}>{social}</a>
                ))
            }
        </div>
        <div>

        </div>
    </div>
  )
}

export default Topbar