const express = require('express');
const mongoose = require('mongoose');

const UserRouter = require('./routes/userRouter');
const ProductRouter = require('./routes/productRouter');
const OrderRouter = require('./routes/orderRouter');

const app = express();
const port = 3000;

const uri = 'mongodb://localhost:27017/brief2';

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.use('/users', UserRouter);
app.use('/products',ProductRouter);
app.use('/orders', OrderRouter);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
