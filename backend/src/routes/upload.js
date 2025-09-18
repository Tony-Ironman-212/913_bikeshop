// route upload hình ảnh lên cloudinary
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../config/cloudinary');

// setup cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Nếu client gửi folderName thì dùng nó, không thì fallback lấy từ file
    if (!req.folderName) {
      req.folderName = file.originalname.split('.')[0];
    }

    return {
      folder: `bike-shop/${req.folderName}`,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      use_filename: true,
      unique_filename: false,
      public_id: file.originalname.split('.')[0], // lấy tên file gốc làm public_id
    };
  },
});

const upload = multer({ storage: storage });

// POST upload 1 ảnh
router.post('/single', upload.single('image'), (req, res) => {
  res.json({ imageUrl: req.file.path });
});

// POST upload nhiều ảnh
router.post('/multiple', upload.array('images', 10), (req, res) => {
  const imageUrls = req.files.map((file) => file.path);
  res.json({ imageUrls });
});

module.exports = router;

//File: backend/src/routes/products.js
