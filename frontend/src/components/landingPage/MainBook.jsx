import { MdOutlineArrowRightAlt } from "react-icons/md";
const MainBook = () => {
  return (
    
    <div className="flex mt-2 h-full">
        <div className="w-[50%] h-full flex flex-col justify-center">
            <h2 className="text-7xl font-merriweather font-light leading-[15vh]">Life of the Wild</h2>
            <div className="mt-5 text-navColor">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est cum voluptatum quisquam! Libero nesciunt accusamus sequi perspiciatis voluptatem ad corrupti dignissimos in quaerat soluta. Adipisci eligendi nostrum eveniet. Quae earum sequi nihil.</div>
            <button className="p-3 border-amber-300 border-2 w-[50%] m-5 flex justify-center items-center gap-4">Read More <MdOutlineArrowRightAlt className="text-xl" /></button>
        </div>
        <div className="h-full">
        <img src="" alt="" />
        </div>
    </div>
  )
}

export default MainBook