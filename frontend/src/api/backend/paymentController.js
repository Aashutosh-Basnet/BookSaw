const axios = require('axios');

// eSewa verification endpoint (UAT environment - change for production)
const ESEWA_VERIFICATION_URL = 'https://uat.esewa.com.np/epay/transrec';
const MERCHANT_ID = 'EPAYTEST'; // Change to your actual merchant ID in production

/**
 * Verify eSewa payment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.verifyEsewaPayment = async (req, res) => {
  try {
    const { refId, productId, amount } = req.body;

    if (!refId || !productId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required verification parameters'
      });
    }

    // Create form data for verification
    const params = new URLSearchParams();
    params.append('amt', amount);
    params.append('rid', refId);
    params.append('pid', productId);
    params.append('scd', MERCHANT_ID);

    // Make verification request to eSewa
    const response = await axios.post(ESEWA_VERIFICATION_URL, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Check if the response contains "Success"
    if (response.data && response.data.includes('Success')) {
      // Payment is verified
      
      // TODO: Save payment details in database
      // Create a transaction record, update order status, etc.
      
      return res.status(200).json({
        success: true,
        message: 'Payment verified successfully'
      });
    } else {
      // Payment verification failed
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    console.error('eSewa verification error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during payment verification',
      error: error.message
    });
  }
};

/**
 * Create order after payment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, paymentDetails } = req.body;

    // Validate the required fields
    if (!userId || !items || !items.length || !totalAmount || !paymentDetails) {
      return res.status(400).json({
        success: false,
        message: 'Missing required order details'
      });
    }

    // TODO: Create order in database
    // Save order details, update inventory, etc.

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      // Return the created order details
      order: {
        orderId: 'SAMPLE_ORDER_ID', // Replace with actual order ID from database
        date: new Date(),
        status: 'PAID',
        totalAmount,
        items: items.length
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the order',
      error: error.message
    });
  }
}; 