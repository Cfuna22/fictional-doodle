const express = require('express');
const { getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/admin/orders - Admin only
router.get('/orders', authenticateToken, requireAdmin, getAllOrders);

// PATCH /api/admin/orders/:id - Admin only
router.patch('/orders/:id', authenticateToken, requireAdmin, updateOrderStatus);

module.exports = router;