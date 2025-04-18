import { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 16.99,
      originalPrice: 24.99,
      cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579036753i/77203.jpg",
      quantity: 1
    },
    {
      id: 2,
      title: "Tomorrow, and Tomorrow, and Tomorrow",
      author: "Gabrielle Zevin",
      price: 19.99,
      originalPrice: 28.99,
      cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1636978687i/58784475.jpg",
      quantity: 1
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 4.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-merriweather mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <img 
              src="https://illustrations.popsy.co/amber/empty-cart.svg" 
              alt="Empty Cart"
              className="w-64 h-64 mx-auto mb-6"
            />
            <h2 className="text-2xl font-merriweather mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any books to your cart yet.</p>
            <button className="bg-navColor text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                    <img 
                      src={item.cover}
                      alt={item.title}
                      className="w-24 h-36 object-cover rounded-md"
                    />
                    <div className="flex-1 ml-6">
                      <h3 className="font-merriweather text-xl mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-2">by {item.author}</p>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xl font-bold text-navColor">${item.price}</span>
                        <span className="text-gray-500 line-through">${item.originalPrice}</span>
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm">
                          {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                        </span>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center border rounded-full">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-4 py-2 text-gray-600 hover:text-navColor transition-colors"
                          >
                            -
                          </button>
                          <span className="px-4 py-2">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-4 py-2 text-gray-600 hover:text-navColor transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="font-merriweather text-2xl mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-navColor">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-navColor text-white px-6 py-3 rounded-full font-bold mt-6 hover:bg-opacity-90 transition-colors">
                  Proceed to Checkout
                </button>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Secure Checkout</p>
                  <div className="flex justify-center gap-2">
                    <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-8" />
                    <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="Mastercard" className="h-8" />
                    <img src="https://cdn-icons-png.flaticon.com/128/349/349230.png" alt="PayPal" className="h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;