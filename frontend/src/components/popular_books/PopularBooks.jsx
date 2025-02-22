

const PopularBooks = () => {
    const genres = [
        {
            "genre": "All genre",
            "link": "link1",
        },
        {
            "genre": "Business",
            "link": "link1",
        },
        {
            "genre": "Technology",
            "link": "link1",
        },
        {
            "genre": "Romantic",
            "link": "link1",
        },
        {
            "genre": "Adventure",
            "link": "link1",
        },
        {
            "genre": "Fictional",
            "link": "link1",
        },
    ]
  return (
    <div className="">
        <div className="flex flex-col items-center m-20">
            <p className="text-navColor">SOME QUALITY ITEMS</p>
            <div className="flex items-center justify-center w-[70%]">
                <div className="w-full border-t border-gray-400"></div>
                <span className="px-4 text-gray-600 text-5xl font-merriweather whitespace-nowrap">Popular Books</span>
                <div className="w-full border-t border-gray-400"></div>
            </div>
        </div>
        <div className=" flex justify-center m-20">
        <ul className="flex gap-20">
            {
                genres.map(({genre}, index)=> (
                    <li key={index} className="cursor-pointer">{genre}</li>
                ))
            }
        </ul>
            </div>
    </div>
  )
}

export default PopularBooks