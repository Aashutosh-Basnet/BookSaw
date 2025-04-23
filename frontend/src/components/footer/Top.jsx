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
        <div className="border-b border-gray-200 py-12 md:py-16">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Logo and Description */}
                <div className="w-full lg:w-1/4">
                    <div className="mb-6">
                        <h2 className="font-merriweather text-3xl md:text-4xl font-extralight">
                            <b className="font-semibold">BOOK</b>SAW
                        </h2>
                    </div>
                    <p className="text-navColor text-sm md:text-base">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. At culpa modi repellendus iure neque commodi, dignissimos ut reprehenderit quos dolorem libero perspiciatis expedita accusamus hic facilis voluptate.
                    </p>
                </div>

                {/* Footer Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full lg:w-3/4">
                    {footer_lists.map((item, index) => (
                        <div key={index}>
                            <h3 className="text-lg md:text-xl font-bold font-georgian mb-4">
                                {item.topic}
                            </h3>
                            <ul className="space-y-3">
                                {item.subtopics.map((sub, subIndex) => (
                                    <li key={subIndex} className="text-gray-600 hover:text-navColor transition-colors cursor-pointer text-sm md:text-base">
                                        {sub}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Top