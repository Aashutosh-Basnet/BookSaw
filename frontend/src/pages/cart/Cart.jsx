import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { initiateEsewaPayment } from '../../api/paymentService';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 4.99;
  const total = subtotal + shipping;

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleEsewaCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty. Add some items to proceed to checkout.');
      return;
    }

    setIsProcessingPayment(true);

    try {
      // Generate a unique product ID for this transaction
      const timestamp = new Date().getTime();
      const productId = `ORDER_${user._id}_${timestamp}`;

      // Prepare payment data for eSewa
      const paymentData = {
        amount: total.toFixed(2),
        productId,
        productName: `BookSaw Order (${cartItems.length} items)`
      };

      // Initiate eSewa payment
      initiateEsewaPayment(paymentData);
    } catch (error) {
      console.error('Error initiating payment:', error);
      setIsProcessingPayment(false);
      alert('Failed to initiate payment. Please try again.');
    }
  };

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
            <button 
              onClick={handleContinueShopping}
              className="bg-navColor text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors"
            >
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
                
                {/* Checkout Button */}
                {/* <button 
                  onClick={handleEsewaCheckout}
                  disabled={isProcessingPayment}
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-full font-bold mt-6 hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                > */}
                <a href="https://payment-gateway-mu-gold.vercel.app/esewa-payment" className='w-full bg-green-60 py-3'
                   
                >
                  {isProcessingPayment ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <img 
                        src="https://esewa.com.np/common/images/esewa_logo.png" 
                        alt="eSewa" 
                        className="h-5 mr-2"
                      />
                      Checkout with eSewa
                    </>
                  )}
                {/* </button> */}
                </a>

                
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;