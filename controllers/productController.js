const Product = require('../models/productModel');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving products');
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving product');
  }
};


const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  console.log(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct); 
  } catch (err) {
    console.error(err);
    res.status(400).send('Error creating product'); 
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updates = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating product');
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status(404).send('Product not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting product');
  }
};

const searchProducts = async (req, res) => {
  const { name } = req.query; 
  
  try {
    
    const products = await Product.find({ name: { $regex: new RegExp(name, 'i') } });

    if (!products.length) {
      return res.status(404).json({ message: 'No products found matching the search term.' });
    }

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error searching products.' });
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct
};

