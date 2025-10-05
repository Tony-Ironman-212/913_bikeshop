const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

// GET /api/orders lấy toàn bộ đơn hàng
router.get('/', async (req, res) => {
  try {
    // trường hợp api yêu cầu sắp xếp theo thứ tự mới nhất
    const { sort } = req.query;
    if (sort === 'newest') {
      const orders = await Order.find()
        .populate('user', 'firstName lastName email')
        .populate('items.product', 'name price')
        .sort({ createdAt: -1 });
      return res.json(orders);
    }

    // trả về tất cả đơn hàng không sắp xếp
    const orders = await Order.find()
      .populate('user', 'firstName lastName email')
      .populate('items.product', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'サーバーエラー' });
  }
});

// GET /api/orders/me lấy đơn hàng của user hiện tại
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // lấy userId từ req.user do authMiddleware đã lưu req.user = decoded
    const { userId } = req.user;

    const userOrders = await Order.find({ user: userId })
      .populate('user', 'firstName lastName email')
      .populate('items.product', 'name price');
    res.json(userOrders);
  } catch (err) {
    res.status(500).json({ message: 'サーバーエラー' });
  }
});

// GET /api/orders/:id lấy chi tiết đơn hàng
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'firstName lastName email')
      .populate('items.product', 'name price');
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'サーバーエラー' });
  }
});

// POST /api/orders tạo đơn hàng mới
router.post('/', authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // lấy userId từ req.user do authMiddleware đã lưu req.user = decoded
    // Lưu ý: khi decode token, Tony đang lưu { userId, email } từ jwt.sign.
    const { userId } = req.user;

    // lấy thông tin đơn hàng từ req.body
    const { items, totalAmount, paymentInfo, shippingAddress, notes } =
      req.body;

    // validate sơ bộ dữ liệu đầu vào
    if (!items || items.length === 0) {
      return res.status(400).json({ message: '注文商品が必要です' });
    }
    if (!shippingAddress) {
      return res.status(400).json({ message: '配送先情報が必要です' });
    }

    //1. kiểm tra tồn kho và cập nhật số lượng sản phẩm
    for (const item of items) {
      const product = await Product.findById(item.product).session(session);
      if (!product) {
        throw new Error('商品が見つかりません: ' + item.product);
      }
      if (product.stock < item.quantity) {
        throw new Error(
          `商品の在庫が不足しています: ${product.name} (在庫: ${product.stock}, 注文数: ${item.quantity})`
        );
      }

      // trừ tồn kho stock
      product.stock -= item.quantity;
      await product.save({ session });
    }

    //2. tạo đơn hàng trong cùng 1 transaction
    const newOrder = new Order({
      user: userId, // userId lấy từ token, Mongoose sẽ convert sang ObjectId tự động
      items,
      totalAmount,
      paymentInfo,
      shippingAddress,
      notes,
    });
    const savedOrder = await newOrder.save({ session });

    // b3. commit transaction. không commit là không lưu thay đổi gì cho db cả
    await session.commitTransaction();
    session.endSession();

    return res
      .status(201)
      .json({ message: '注文が正常に作成されました', order: savedOrder });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    res.status(500).json({ message: 'サーバーエラー', error: err.message });
  }
});

module.exports = router;
