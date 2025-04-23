import { IoIosSend } from "react-icons/io";

const NewsLetter = () => {
  return (
    <div className="w-full bg-[rgb(237,235,228)]">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Left Section */}
          <div className="w-full md:w-1/2">
            <div className="relative inline-block">
              <h3 className="text-3xl md:text-4xl font-merriweather mb-2">
                Subscribe To Our Newsletter
              </h3>
              <span className="absolute bottom-0 left-0 w-1/4 border-b-2 border-black"></span>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2">
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Stay updated with our latest releases, exclusive offers, and literary insights. 
              Join our community of book lovers and never miss out on the next great read.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-navColor transition-all"
                />
              </div>
              <button className="inline-flex items-center justify-center gap-2 bg-navColor text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors">
                SUBSCRIBE
                <IoIosSend className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsLetter