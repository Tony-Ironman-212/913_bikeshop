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
        .sort({ createdAt: -1 })
        .select('+isDeleted'); // thêm trường isDeleted vào kết quả truy vấn
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
      .populate('items.product', 'name price')
      .select('+isDeleted'); // thêm trường isDeleted vào kết quả truy vấn

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

// PATH /api/orders/:id cập nhật trạng thái đơn hàng
router.patch('/:id', async (req, res) => {
  try {
    const { paymentInfo, shippingAddress, shippingStatus } = req.body;

    // validate dữ liệu đầu vào
    if (!paymentInfo || !shippingAddress || !shippingStatus) {
      return res.status(400).json({ message: '必要な情報が不足しています' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        paymentInfo,
        shippingAddress,
        shippingStatus,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: '注文が見つかりません' });
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: 'サーバーエラー' });
  }
});

// PATCH /api/orders/:id/cancel xóa mềm đơn hàng (hủy đơn), ngoài ra còn phải trả về lại số lượng sản phẩm về lại như trước khi order
router.patch('/:id/cancel', async (req, res) => {
  // b1 tạo phiên session và bắt đầu giao dịch startTransaction
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // b2 lấy items từ req.body để tìm document tương ứng và cập nhật lại stock của sản phẩm
    const { items } = req.body;

    // b3 validate sơ bộ dữ liệu đầu vào
    if (!items || items.length === 0) {
      return res.status(400).json({ message: '注文商品が必要です' });
    }

    // b4 sửa lại stock của product
    for (const item of items) {
      const product = await Product.findById(item.product).session(session);
      if (!product) {
        throw new Error('商品が見つかりません: ' + item.product);
      }
      product.stock += item.quantity; // trả lại số lượng sản phẩm về lại như trước khi order
      await product.save({ session });
    }

    // b5 cập nhật isDeleted của order = true
    await Order.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { session }
    );

    // b6 commitTransaction và kết thúc phiên session
    await session.commitTransaction();
    session.endSession();

    res.json({ message: '注文が正常にキャンセルされました' });
  } catch (err) {
    res.status(500).json({ message: 'サーバーエラー' });
  }
});

module.exports = router;
