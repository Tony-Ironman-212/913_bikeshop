const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    isAgreed: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    phone: { type: String },
    zipCode: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
