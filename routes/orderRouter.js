const express = require('express');
const orderController = require('../controllers/orderController');

const orderRouter = express.Router();

orderRouter.post('/', orderController.createOrder);
orderRouter.get('/', orderController.getAllOrders);
orderRouter.get('/:id', orderController.getOrderById);
orderRouter.put('/:id', orderController.updateOrder);
orderRouter.delete('/:id', orderController.deleteOrder);

module.exports = orderRouter;
