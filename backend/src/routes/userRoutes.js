const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// import cá nhân
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // không trả về trường password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { lastName, firstName, email, password, isAgreed } = req.body;
    // kiểm tra sữ liệu có thiếu hay không?
    if (!lastName || !firstName || !email || !password || !isAgreed) {
      return res
        .status(400)
        .json({ message: 'すべてのフィールドを入力してください' });
    }
    // kiểm tra xem email đã tồn tại chưa?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'このEmailは既に登録されています' });
    }
    // mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    // tạo user mới
    const newUser = new User({
      lastName,
      firstName,
      email,
      password: hashedPassword,
      isAgreed,
    });
    // lưu user mới bào DB
    await newUser.save();
    // trả về trình duyệt thông báo thành công
    res.status(201).json({ message: 'ユーザー登録が完了しました' });
  } catch (err) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
});

module.exports = router;
