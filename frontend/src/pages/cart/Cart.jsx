const Cart = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-200">
        <div className="bg-white h-[75%] w-[45%]">
            <img src="" alt="" />
        </div>
        <div className="bg-slate-500 h-[75%] w-[45%] text-white">
            <div className="m-5">

            <h2 className="text-4xl font-merriweather">Title</h2>
            <p>Author: John Doe</p>
            <p className="my-5 text-lg">price</p>
            <div>Rating</div>
            <p className="m-3 p-3 border-x-1 border-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque repudiandae saepe iste facere fugiat voluptate excepturi quam eveniet nihil minima.</p>
            <div>Delivery Option</div>
            <div>
                <button className="bg-white text-slate-500 p-2 rounded-md my-5">Checkout</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Cart