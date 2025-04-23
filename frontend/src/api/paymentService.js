import axios from 'axios';

// eSewa configuration
const ESEWA_MERCHANT_ID = 'EPAYTEST'; // Change to 'EPAYMENT' or your actual merchant ID
const ESEWA_SUCCESS_URL = `${window.location.origin}/payment/success`;
const ESEWA_FAILURE_URL = `${window.location.origin}/payment/failure`;
const ESEWA_ENDPOINT = 'https://uat.esewa.com.np/epay/main'; // Use https://esewa.com.np/epay/main for production

/**
 * Initiate an eSewa payment
 * @param {Object} paymentData - Payment details
 * @param {string} paymentData.amount - Payment amount
 * @param {string} paymentData.productId - Unique identifier for the order/product
 * @param {string} paymentData.productName - Name of the product
 */
export const initiateEsewaPayment = (paymentData) => {
  const { amount, productId, productName } = paymentData;

  // Create a form element
  const form = document.createElement('form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', ESEWA_ENDPOINT);
  form.setAttribute('id', 'esewaForm');

  // Create form fields
  const formFields = {
    amt: amount,
    psc: 0, // Service charge
    pdc: 0, // Delivery charge
    txAmt: 0, // Tax amount
    tAmt: amount, // Total amount (including tax, service charge, etc.)
    pid: productId,
    scd: ESEWA_MERCHANT_ID,
    su: ESEWA_SUCCESS_URL,
    fu: ESEWA_FAILURE_URL,
  };

  // Add fields to the form
  Object.entries(formFields).forEach(([key, value]) => {
    const hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', key);
    hiddenField.setAttribute('value', value);
    form.appendChild(hiddenField);
  });

  // Add the form to the document body and submit
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

/**
 * Verify eSewa payment with your backend
 * @param {Object} verificationData - Data for verification
 * @param {string} verificationData.refId - Reference ID from eSewa
 * @param {string} verificationData.productId - Product ID used during payment
 * @param {string} verificationData.amount - Amount paid
 */
export const verifyEsewaPayment = async (verificationData) => {
  try {
    const response = await axios.post('/api/payment/verify-esewa', verificationData);
    return response.data;
  } catch (error) {
    console.error('Payment verification failed:', error);
    throw error;
  }
};

export default {
  initiateEsewaPayment,
  verifyEsewaPayment,
}; 