import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/cart');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment Failed</h2>
          <p className="text-gray-600 text-center mb-6">
            Your payment could not be processed. This could be due to a network issue, insufficient funds, or a problem with your payment method.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={handleContinueShopping}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none flex-1"
            >
              Continue Shopping
            </button>
            <button
              onClick={handleRetry}
              className="px-6 py-2 bg-navColor text-white rounded-md hover:bg-opacity-90 focus:outline-none flex-1"
            >
              Retry Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure; 