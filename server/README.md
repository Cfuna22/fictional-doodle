# 🍿 Moses Snacks Express API

A complete backend API for a snacks delivery application built with Express.js and MongoDB.

## 🚀 Features

- **Admin Authentication**: JWT-based login system
- **Snack Management**: Full CRUD operations for snacks
- **Order Management**: Customer ordering and admin order tracking
- **Real-time Notifications**: Console alerts for new orders
- **Secure Routes**: Protected admin endpoints
- **Sample Data**: Pre-populated with sample snacks

## 🛠️ Tech Stack

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## 📋 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Snacks (Public)
- `GET /api/snacks` - Get all available snacks

### Snacks (Admin Only)
- `POST /api/snacks` - Create new snack
- `PATCH /api/snacks/:id` - Update snack
- `DELETE /api/snacks/:id` - Delete snack

### Orders
- `POST /api/orders` - Place new order (Customer)

### Admin Orders
- `GET /api/admin/orders` - Get all orders (Admin)
- `PATCH /api/admin/orders/:id` - Update order status (Admin)

## 🏃‍♂️ Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Copy `.env` file and update MongoDB URI if needed
   - Default admin credentials: `admin@mosessnacks.com` / `admin123`

3. **Seed the database**:
   ```bash
   npm run seed
   ```

4. **Start the server**:
   ```bash
   npm run dev
   ```

The API will be running at `http://localhost:5000`

## 🧪 Testing with Postman

1. Import the `postman-collection.json` file into Postman
2. Set the `baseUrl` variable to `http://localhost:5000/api`
3. Login as admin to get JWT token
4. Set the `token` variable with the received JWT token
5. Test all endpoints!

## 👤 Default Admin Credentials

- **Email**: `admin@mosessnacks.com`
- **Password**: `admin123`

## 🔔 Order Notifications

When customers place orders, Moses receives detailed console notifications including:
- Customer information
- Order details
- Total amount
- Delivery address

## 📁 Project Structure

```
├── controllers/        # Business logic
├── middleware/         # Authentication middleware
├── models/            # MongoDB schemas
├── routes/            # API routes
├── utils/             # Utilities (seed data)
├── server.js          # Main server file
└── .env              # Environment variables
```

## 🛡️ Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected admin routes
- Input validation
- CORS configuration

## 📱 Order Status Flow

1. **Pending** - Order received
2. **Preparing** - Kitchen is preparing the order
3. **Out for Delivery** - Order is being delivered
4. **Delivered** - Order completed
5. **Cancelled** - Order cancelled

## 🎯 Sample Snacks Included

- Classic Potato Chips
- Chocolate Chip Cookies  
- Mixed Nuts
- Gummy Bears
- Cola Drink
- Trail Mix
- Cheese Crackers
- Pretzels

Ready to start delivering delicious snacks! 🚚✨