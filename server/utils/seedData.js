const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Snack = require('../models/Snack');
const Order = require('../models/Order');

// Sample data
const adminUser = {
  email: process.env.ADMIN_EMAIL || 'admin@moses.com',
  password: process.env.ADMIN_PASSWORD || 'admin123',
  name: 'Moses Admin',
  role: 'admin'
};

const sampleSnacks = [
  {
    name: 'Classic Potato Chips',
    imageUrl: 'https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg',
    price: 2.99,
    category: 'Chips',
    description: 'Crispy and golden potato chips with a perfect crunch'
  },
  {
    name: 'Chocolate Chip Cookies',
    imageUrl: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg',
    price: 4.50,
    category: 'Cookies',
    description: 'Freshly baked cookies loaded with chocolate chips'
  },
  {
    name: 'Mixed Nuts',
    imageUrl: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg',
    price: 6.99,
    category: 'Nuts',
    description: 'Premium mix of almonds, cashews, and peanuts'
  },
  {
    name: 'Gummy Bears',
    imageUrl: 'https://images.pexels.com/photos/161668/gummi-bears-fruit-gums-bear-sweetness-161668.jpeg',
    price: 3.25,
    category: 'Candy',
    description: 'Colorful and chewy gummy bears in assorted flavors'
  },
  {
    name: 'Cola Drink',
    imageUrl: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg',
    price: 1.99,
    category: 'Drinks',
    description: 'Refreshing cola drink to quench your thirst'
  },
  {
    name: 'Trail Mix',
    imageUrl: 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg',
    price: 5.75,
    category: 'Healthy',
    description: 'Nutritious mix of dried fruits and nuts'
  },
  {
    name: 'Cheese Crackers',
    imageUrl: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
    price: 3.99,
    category: 'Other',
    description: 'Crunchy crackers with real cheese flavor'
  },
  {
    name: 'Pretzels',
    imageUrl: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
    price: 2.75,
    category: 'Other',
    description: 'Twisted and salted pretzels for the perfect snack'
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, );
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Snack.deleteMany({});
    await Order.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = new User(adminUser);
    await admin.save();
    console.log('👤 Admin user created');

    // Create snacks
    await Snack.insertMany(sampleSnacks);
    console.log('🍿 Sample snacks created');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Login Credentials:');
    console.log(`Email: ${adminUser.email}`);
    console.log(`Password: ${adminUser.password}`);
    console.log('\n🚀 You can now start the server with: npm run dev');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();