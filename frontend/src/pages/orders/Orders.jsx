import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data.orders || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch your orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    } else {
      navigate('/login', { state: { from: '/orders' } });
    }
  }, [user, navigate]);

  const getOrderStatusColor = (status) => {
    switch(status) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800';
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800';
      case 'DELIVERED':
        return 'bg-teal-100 text-teal-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navColor"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-merriweather mb-8">My Orders</h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{error}</p>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <img 
              src="https://illustrations.popsy.co/amber/empty-box.svg" 
              alt="No Orders"
              className="w-64 h-64 mx-auto mb-6"
            />
            <h2 className="text-2xl font-merriweather mb-4">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping to fill your order history!</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-navColor text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors"
            >
              Browse Books
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md divide-y">
            {orders.map((order) => (
              <div key={order.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order placed</p>
                    <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-semibold">${order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                    <div className={`text-xs font-semibold px-2 py-1 rounded-full mt-1 inline-block ${getOrderStatusColor(order.status)}`}>
                      {order.status}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-4">
                  <h3 className="font-semibold mb-3">Order Items</h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <img 
                          src={item.cover} 
                          alt={item.title} 
                          className="w-16 h-24 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-600">by {item.author}</p>
                          <div className="flex mt-1 text-sm">
                            <p className="text-gray-600 mr-4">Qty: {item.quantity}</p>
                            <p className="font-medium">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders; 