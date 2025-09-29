const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

//GET api/products all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//POST api/products a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//PATCH api/products update a product by ID, partial update
router.patch('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE api/products a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET api/products/bike lấy sản phẩm loại bike
router.get('/bike', async (req, res) => {
  try {
    const bikeProducts = await Product.find({ type: 'bike' });
    res.json(bikeProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET api/products/frame lấy sản phẩm loại frame
router.get('/frame', async (req, res) => {
  try {
    const frameProducts = await Product.find({ type: 'frame' });
    res.json(frameProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET api/products/wheel lấy sản phẩm loại wheel
router.get('/wheel', async (req, res) => {
  try {
    const wheelProducts = await Product.find({ type: 'wheel' });
    res.json(wheelProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET api/products/search?search=keyword tìm kiếm sản phẩm theo từ khóa
router.get('/search', async (req, res) => {
  const searchTerm = req.query.search;
  try {
    // nếu không có searchTerm thì trả về mảng rỗng
    if (!searchTerm) {
      return res.json([]);
    }

    // Tạo regex cho tìm kiếm (không phân biệt hoa thường, gần đúng)
    const regex = new RegExp(searchTerm, 'i');

    // tìm trong các field quan trọng
    const searchedProducts = await Product.find({
      $or: [
        { name: regex },
        { type: regex },
        { 'description.size': regex },
        { 'description.condition': { $regex: regex } },
      ],
    });

    res.json(searchedProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

//File: backend/src/server.js
