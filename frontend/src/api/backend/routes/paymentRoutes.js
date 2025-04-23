const express = require('express');
const { verifyEsewaPayment, createOrder } = require('../paymentController');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

// Route to verify eSewa payment
router.post('/verify-esewa', authenticate, verifyEsewaPayment);

// Route to create an order after payment
router.post('/create-order', authenticate, createOrder);

module.exports = router; 