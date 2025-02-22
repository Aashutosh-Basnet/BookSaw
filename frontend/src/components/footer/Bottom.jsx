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
    <div className="flex justify-between my-10">
        <p>@2025 All rights reserved.</p>
      <div className="flex gap-4 text-md">
        {
          socials.map(({social, link}, index) => (
            <a href={link} key={index}>{social}</a>
          ))
        }
      </div>
    </div>
  )
}

export default Bottom