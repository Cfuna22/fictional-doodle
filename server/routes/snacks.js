const express = require('express');
const { 
  getAllSnacks, 
  createSnack, 
  updateSnack, 
  deleteSnack 
} = require('../controllers/snackController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/snacks - Public route
router.get('/', getAllSnacks);

// POST /api/snacks - Admin only
router.post('/', authenticateToken, requireAdmin, createSnack);

// PATCH /api/snacks/:id - Admin only
router.patch('/:id', authenticateToken, requireAdmin, updateSnack);

// DELETE /api/snacks/:id - Admin only
router.delete('/:id', authenticateToken, requireAdmin, deleteSnack);

module.exports = router;