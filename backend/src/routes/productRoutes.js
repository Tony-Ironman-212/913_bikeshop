const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

//GET api/products all products, not include isDeleted
router.get('/', async (req, res) => {
  try {
    const { sort, limit } = req.query;
    if (sort === 'newest') {
      const products = await Product.find({ isDeleted: false })
        .sort({ createdAt: -1 })
        .limit(limit);
      return res.json(products);
    }
    const products = await Product.find({ isDeleted: false });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET api/products/bike lấy sản phẩm loại bike, không bao gồm isDeleted
router.get('/bike', async (req, res) => {
  try {
    const bikeProducts = await Product.find(
      { type: 'bike' },
      { isDeleted: false }
    );
    res.json(bikeProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET api/products/frame lấy sản phẩm loại frame, không bao gồm isDeleted
router.get('/frame', async (req, res) => {
  try {
    const frameProducts = await Product.find(
      { type: 'frame' },
      { isDeleted: false }
    );
    res.json(frameProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET api/products/wheel lấy sản phẩm loại wheel, không bao gồm isDeleted
router.get('/wheel', async (req, res) => {
  try {
    const wheelProducts = await Product.find(
      { type: 'wheel' },
      { isDeleted: false }
    );
    res.json(wheelProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET api/products/search?search=keyword tìm kiếm sản phẩm theo từ khóa, không bao gồm isDeleted
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
    const searchedProducts = await Product.find(
      {
        $or: [
          { name: regex },
          { type: regex },
          { 'description.size': regex },
          { 'description.condition': { $regex: regex } },
        ],
      },
      { isDeleted: false }
    );

    res.json(searchedProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET api/products/:slug lấy chi tiết sản phẩm theo slug
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// những api cho admin
// GET api/products/admin/all lấy tất cả sản phẩm, bao gồm cả isDeleted
router.get('/admin/all', async (req, res) => {
  try {
    const { sort } = req.query;
    if (sort === 'newest') {
      const products = await Product.find()
        .select('+isDeleted')
        .sort({ createdAt: -1 });
      return res.json(products);
    }
    const products = await Product.find().select('+isDeleted');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET api/products/admin/:id lấy chi tiết sản phẩm theo ID, cho admin
router.get('/admin/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select('+isDeleted');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//POST api/products a new product cho admin
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//PATCH api/products/:id update a product by ID, partial update cho admin
router.patch('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('+isDeleted');

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

//File: backend/src/server.js
