import { IoIosSend } from "react-icons/io";

const NewsLetter = () => {
  return (
    <div className="w-screen flex justify-center bg-[rgb(237,235,228)] items-center">
    <div className="h-[40vh] w-[60%] flex p-10">
        <div className="w-[50%]">
        <h3 className="text-4xl font-merriweather relative">
            Subscribe To Our NewsLetter
            <span className="absolute bottom-0 w-[15%] border-b-2 border-black"></span>
        </h3>


        </div>
        <div className="w-[50%]">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus dicta maxime magnam omnis culpa hic harum totam enim, consequuntur quas! Iusto hic ea amet!</p>
            <div className="mt-5 flex justify-between border-b-1 border-slate-500">
                <input type="text" placeholder="Enter your email address" className="p-3 focus:outline-none"/>
                <button className="font-bold flex items-center gap-4">SEND <IoIosSend /></button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default NewsLetter