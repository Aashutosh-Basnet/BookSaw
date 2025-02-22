

const BestSellingBook = () => {
  return (
    <div className="h-[80vh] w-screen bg-[rgb(237,235,228)] flex justify-center items-center">
        <div className="w-[50%] p-10">

        </div>
        <div className="w-[50%]">
            <div className="">
            <h3 className="text-4xl font-merriweather my-5">Best Selling Book</h3>
            <span className="block w-[5%] border-b-2 border-black"></span>
            </div>
            <div className="my-5">
                <p className="font-georgian text-navColor">By author name</p>
                <h4 className="text-2xl font-merriweather mt-5">Birds Gonna Be Happy</h4>
                <p className="my-10 text-navColor w-[50%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam atque aliquam maiores nobis, in quod tempora ducimus et voluptas.</p>
                <p>price</p>
                <button className="font-bold font-georgian my-10">Shop it now</button>
            </div>
        </div>
    </div>
  )
}

export default BestSellingBook