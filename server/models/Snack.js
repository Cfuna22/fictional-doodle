const mongoose = require('mongoose');

const snackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Chips', 'Cookies', 'Candy', 'Nuts', 'Drinks', 'Healthy', 'Other'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Snack', snackSchema);