import { MdOutlineArrowRightAlt } from "react-icons/md";
const MainBook = () => {
  return (
    <div className="flex flex-col lg:flex-row mt-2 h-full gap-8">
        <div className="w-full lg:w-[50%] h-full flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-merriweather font-light leading-tight lg:leading-[15vh]">Life of the Wild</h2>
            <div className="mt-5 text-navColor text-sm sm:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est cum voluptatum quisquam! Libero nesciunt accusamus sequi perspiciatis voluptatem ad corrupti dignissimos in quaerat soluta. Adipisci eligendi nostrum eveniet. Quae earum sequi nihil.</div>
            <button className="p-3 border-amber-300 border-2 w-full sm:w-[70%] lg:w-[50%] m-5 flex justify-center items-center gap-4 hover:bg-amber-300 hover:text-white transition-colors duration-300">Read More <MdOutlineArrowRightAlt className="text-xl" /></button>
        </div>
        <div className="w-full lg:w-[50%] h-full flex items-center justify-center">
            <img 
                src="http://books.google.com/books/content?id=KQZCPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api" 
                alt="Book cover" 
                className="w-full max-w-md object-contain"
            />
        </div>
    </div>
  )
}

export default MainBook