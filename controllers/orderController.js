const Order = require('../models/orderModel');
const Product = require('../models/productModel');

createOrder = async (req, res) => {
  const { customerId, items } = req.body;

  const productPromises = items.map(item => Product.findById(item.productId));
  const products = await Promise.all(productPromises);

  if (!products.every(product => product)) {
    return res.status(400).send('One or more products not found');
  }

  const totalPrice = products.reduce((acc, product) => acc + (product.price * item.quantity), 0);

  const newOrder = new Order({ customerId, items, totalPrice });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating order');
  }
};

getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customerId', 'name email');
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving orders');
  }
};

getOrderById = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId).populate('customerId', 'name email');
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving order');
  }
};

updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const updates = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, { new: true, runValidators: true });
    if (!updatedOrder) {
      return res.status(404).send('Order not found');
    }
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(400).send('Error updating order');
  }
};

deleteOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).send('Order not found');
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting order');
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
