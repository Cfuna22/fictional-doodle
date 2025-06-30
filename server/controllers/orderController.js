const Order = require('../models/Order');
const Snack = require('../models/Snack');

const createOrder = async (req, res) => {
  try {
    const { customerName, customerPhone, deliveryAddress, items, notes } = req.body;

    if (!customerName || !customerPhone || !deliveryAddress || !items || items.length === 0) {
      return res.status(400).json({ 
        message: 'Customer name, phone, delivery address, and items are required' 
      });
    }

    // Validate and populate order items
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const snack = await Snack.findById(item.snackId);
      if (!snack) {
        return res.status(400).json({ 
          message: `Snack with ID ${item.snackId} not found` 
        });
      }

      if (!snack.available) {
        return res.status(400).json({ 
          message: `${snack.name} is currently not available` 
        });
      }

      const orderItem = {
        snack: snack._id,
        quantity: item.quantity,
        price: snack.price
      };

      orderItems.push(orderItem);
      totalAmount += snack.price * item.quantity;
    }

    const order = new Order({
      customerName,
      customerPhone,
      deliveryAddress,
      items: orderItems,
      totalAmount,
      notes
    });

    await order.save();
    await order.populate('items.snack');

    // 🍿 Notify Moses about the new order
    console.log('\n🔔 NEW ORDER ALERT! 🔔');
    console.log('==========================================');
    console.log(`📋 Order ID: ${order._id}`);
    console.log(`👤 Customer: ${customerName}`);
    console.log(`📞 Phone: ${customerPhone}`);
    console.log(`📍 Address: ${deliveryAddress}`);
    console.log(`💰 Total: $${totalAmount.toFixed(2)}`);
    console.log('📦 Items:');
    order.items.forEach(item => {
      console.log(`   - ${item.snack.name} x ${item.quantity} ($${item.price})`);
    });
    if (notes) console.log(`📝 Notes: ${notes}`);
    console.log('==========================================\n');

    res.status(201).json({
      message: 'Order placed successfully! Moses has been notified.',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('items.snack')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Orders retrieved successfully',
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Error retrieving orders' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
    
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: 'Valid status is required',
        validStatuses
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('items.snack');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Log status update
    console.log(`📋 Order ${order._id} status updated to: ${status}`);

    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  updateOrderStatus
};