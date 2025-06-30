const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const snackRoutes = require('./routes/snacks');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/snacks', snackRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({
    message: '🍿 Welcome to Moses Snacks Express API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/login',
      snacks: '/api/snacks',
      orders: '/api/orders',
      admin: '/api/admin'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'production' ? {} : err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Moses Snacks Express API running on port ${PORT}`);
  console.log(`📱 API Base URL: http://localhost:${PORT}`);
});