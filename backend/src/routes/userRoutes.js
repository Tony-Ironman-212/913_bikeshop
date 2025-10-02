const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// import cá nhân
const User = require('../models/User');

// tạo router
const router = express.Router();

// GET api/users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // không trả về trường password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
});

// POST api/users/register
router.post('/register', async (req, res) => {
  try {
    const { lastName, firstName, email, password, isAgreed } = req.body;
    // kiểm tra dữ liệu có thiếu hay không?
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

// POST api/users/login
router.post('/login', async (req, res) => {
  try {
    // B1 nhận request thông tin tử frontend gửi lên
    const { email, password } = req.body;

    // B2 kiểm tra dữ liệu có thiếu hay không?
    if (!email || !password) {
      return res.status(400).json({
        message: 'すべてのフィールドを入力してください',
      });
    }

    // B3 tìm user trong DB theo email, nếu không thấy trả về lỗi
    const existingUser = await User.findOne({ email }).select('+password');
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: 'メールまたはパスワードが間違っています' });
    }

    // B4 so khớp mật khẩu không, nếu sai trả về lỗi
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: 'メールまたはパスワードが間違っています' });
    }

    // B5 nếu thành công hết, trả về JWT token, kèm thèo user info cơ bản
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h', // token có hạn trong 1 giờ
      }
    );

    const userWithoutPassword = existingUser.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      message: 'ログインに成功しました',
      user: userWithoutPassword,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
});

// POST api/users/update/:id
// b1 nhận request từ frontend, có đầy dủ thông tin như lúc đăng ký, kèm thêm phone và address
// b2 kiểm tra dữ liệu có thiếu hay không?
// b3 tìm user trong DB theo id, nếu không thấy trả về lỗi
// b4 nếu tìm thấy tiến hành cập nhật thông tin user
// b5 trả về trình duyệt thông báo thành công và user info mới
router.post('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { lastName, firstName, phone, zipCode, address } = req.body;
    if (!lastName || !firstName || !phone || !zipCode || !address) {
      return res
        .status(400)
        .json({ message: 'すべてのフィールドを入力してください' });
    }

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }

    // b4 nếu tìm thấy tiến hành cập nhật thông tin user
    existingUser.lastName = lastName;
    existingUser.firstName = firstName;
    existingUser.phone = phone;
    existingUser.zipCode = zipCode;
    existingUser.address = address;
    await existingUser.save();

    const { password, ...userWithoutPassword } = existingUser.toObject();

    // b5 trả về trình duyệt thông báo thành công và user info mới
    res.status(200).json({
      message: 'ユーザー情報が更新されました',
      user: userWithoutPassword,
    });
  } catch (err) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
});

module.exports = router;
