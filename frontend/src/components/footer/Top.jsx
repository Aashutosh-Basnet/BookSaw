const Top = () => {
    const footer_lists = [
        {
            "topic" : "About Us",
            "subtopics": ["vision", "articles", "careers", "service terms", "donate"],
        },
        {
            "topic": "Discover",
            "subtopics": ["Home", "Books", "Authors", "Subjects", "Advanced Search"],
        },
        {
            "topic": "My Account",
            "subtopics": ["Sign In", "View Cart", "My WishList", "Track My Order"],
        },
        {
            "topic": "Help",
            "subtopics": ["Help Center", "Report a problem", "Suggesting edits", "Contact Us"]
        }
    ]
  return (
    <div className="border-b-1 border-slate-300 py-20 flex">
        <div className="w-[18vw]">
            <div className="flex flex-col ">
                <h2 className="font-merriweather text-4xl font-extralight"><b className="font-semibold">BOOK</b>SAW</h2>
            </div>
            <p className="text-navColor">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. At culpa modi repellendus iure neque commodi, dignissimos ut reprehenderit quos dolorem libero perspiciatis expedita accusamus hic facilis voluptate laudantium officia ex beatae sit magnam! Dolorum, dolor?
            </p>
        </div>
        <div className="flex gap-20 mx-[4vw] font-georgian">
            {
               footer_lists.map((item, index) => (
                <div key={index} className="">
                    <h3 className="text-xl font-bold">{item.topic}</h3>
                    <ul className="mt-[30px]">
                        {item.subtopics.map((sub, subIndex) => (
                            <li key={subIndex}>
                                {sub}
                            </li>
                        ))}
                    </ul>
                </div>
               ))
            }
        </div>
    </div>
  )
}

export default Top