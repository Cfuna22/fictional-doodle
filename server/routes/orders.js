const express = require('express');
const { createOrder } = require('../controllers/orderController');

const router = express.Router();

// POST /api/orders - Customer can place orders
router.post('/', createOrder);

module.exports = router;