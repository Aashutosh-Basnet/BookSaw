import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
    
const Bottom = () => {
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
    <div className="flex flex-col md:flex-row justify-between items-center py-6 md:py-8">
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-0">
          ©2025 BookSaw. All rights reserved.
        </p>
        <div className="flex gap-6 text-xl md:text-2xl">
          {socials.map(({social, link}, index) => (
            <a 
              href={link} 
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-navColor transition-colors"
            >
              {social}
            </a>
          ))}
        </div>
    </div>
  )
}

export default Bottom