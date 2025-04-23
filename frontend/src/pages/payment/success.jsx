import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyEsewaPayment } from '../../api/paymentService';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const PaymentSuccess = () => {
  const [verifying, setVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState({ success: false, message: '' });
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { clearCart } = useCart();

  useEffect(() => {
    // Get query params from the URL
    const queryParams = new URLSearchParams(location.search);
    const refId = queryParams.get('refId');
    const amount = queryParams.get('amt');
    const productId = queryParams.get('pid');

    // If we don't have these params, something is wrong
    if (!refId || !amount || !productId) {
      setVerificationStatus({
        success: false,
        message: 'Missing payment information. Please try again.'
      });
      setVerifying(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        // Verify the payment with your backend
        await verifyEsewaPayment({
          refId,
          productId,
          amount
        });

        // Payment verified, save order in your system
        // TODO: Implement API call to save the order details

        setVerificationStatus({
          success: true,
          message: 'Payment successful! Your order has been placed.'
        });

        // Clear the cart since payment was successful
        clearCart();
      } catch (error) {
        console.error('Payment verification failed:', error);
        setVerificationStatus({
          success: false,
          message: 'Payment verification failed. Please contact customer support.'
        });
      } finally {
        setVerifying(false);
      }
    };

    if (user) {
      verifyPayment();
    } else {
      navigate('/login', { state: { from: location } });
    }
  }, [location, user, navigate, clearCart]);

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleViewOrders = () => {
    navigate('/orders');
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navColor mb-4"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Verifying Payment</h2>
            <p className="text-gray-600 text-center">Please wait while we verify your payment...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center">
          {verificationStatus.success ? (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment Successful!</h2>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment Verification Issue</h2>
            </>
          )}
          <p className="text-gray-600 text-center mb-6">{verificationStatus.message}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={handleContinueShopping}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none flex-1"
            >
              Continue Shopping
            </button>
            {verificationStatus.success && (
              <button
                onClick={handleViewOrders}
                className="px-6 py-2 bg-navColor text-white rounded-md hover:bg-opacity-90 focus:outline-none flex-1"
              >
                View Orders
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 