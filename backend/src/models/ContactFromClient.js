// các bước tạo model
// B1. import mongoose
// B2. tạo xxxSchema bằng new mongoose.Schema()
// Schema truyền vào 2 tham số. tham số 1 là object đình nghĩa các trường của document
// tham số 2 là object timestamps: true để tự động thêm 2 trường createdAt và updatedAt
// B3. xuất model bằng module.exports = mongoose.model()
// truyền cho model() 2 tham số, tên model dạng chuỗi, và schema đã tạo

const mongoose = require('mongoose');

const contactFromClientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    inquiryType: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactFromClient', contactFromClientSchema);
