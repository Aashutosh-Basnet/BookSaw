const BestSellingBook = () => {
  return (
    <div className="h-[80vh] w-screen bg-[rgb(237,235,228)] flex justify-center items-center">
        <div className="w-[50%] p-10 flex justify-center items-center">
            <div className="relative group">
                <img 
                    src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579036753i/77203.jpg" 
                    alt="The Alchemist Book Cover" 
                    className="w-[300px] h-[450px] object-cover rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-[-20px] right-[-20px] bg-navColor text-white px-4 py-2 rounded-full transform rotate-12">
                    <span className="font-bold">Best Seller</span>
                </div>
            </div>
        </div>
        <div className="w-[50%]">
            <div className="">
                <h3 className="text-xl md:text-4xl font-merriweather my-5">Best Selling Book</h3>
                <span className="block w-[5%] border-b-2 border-black"></span>
            </div>
            <div className="my-5">
                <p className="font-georgian text-navColor text-lg">By Paulo Coelho</p>
                <h4 className="text-xl md:text-3xl font-merriweather mt-5">The Alchemist</h4>
                <p className="text-md md:text-lg my-10 text-navColor w-[80%] leading-relaxed">
                    A magical story about following your dreams. This enchanting novel has inspired millions of readers worldwide with its mystical journey of self-discovery. Follow Santiago, an Andalusian shepherd boy, as he travels in search of a worldly treasure and discovers something far more meaningful.
                </p>
                <div className="text-md md:text-lg flex items-center gap-4 mb-6">
                    <p className="text-2xl font-bold text-navColor">$16.99</p>
                    <span className="line-through text-gray-500">$24.99</span>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">32% OFF</span>
                </div>
                <div className="flex gap-4 items-center">
                    <button className="bg-navColor text-white px-8 py-3 rounded-full font-bold font-georgian hover:bg-opacity-90 transition-colors flex items-center gap-2">
                        Shop it now
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="User"/>
                            <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="User"/>
                            <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=3" alt="User"/>
                        </div>
                        <p className="text-sm text-gray-600">2M+ readers</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BestSellingBook;