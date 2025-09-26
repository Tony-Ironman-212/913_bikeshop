// tạo middleware xác thực token của user khi gọi api
// token mà hét hạn thì trả về lỗi 401, frontend sẽ điều hướng về trang login
// B1 tạo biến jwt từ jsonwebtoken
// B2 khởi tạo function authMiddleware
// B3 lấy authHeader từ req.headers.["authorization"]
// B4 lấy token từ authHeader && authHeader.split(' ')[1]
// B5 nếu không có token, return về lỗi 401 kèm json message "認証トークンが必要です"
// B6 tiến hành verify token, cần truyền cho verify 3 tham số token, secret key, callback
// B7 trong callback, nếu có lỗi, nếu lỗi là TokenExpiredError thì trả về lỗi 401 kèm message "認証トークンの有効期限が切れています"
// ngược lại trả về lỗi 403 kèm message "無効な認証トークンです"
// B8 nếu verify thành công, lưu thông tin user vào req.user = decoded
// B9 gọi next() để chuyển sang middleware tiếp theo hoặc route handler

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: '認証トークンが必要です' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res
          .status(401)
          .json({ message: '認証トークンの有効期限が切れています' });
      }
      return res.status(403).json({ message: '無効な認証トークンです' });
    }
    req.user = decoded; // lưu thông tin user vào req.user
    next();
  });
}

module.exports = authMiddleware;
