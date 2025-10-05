const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    // user đặt hàng
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // các sản phẩm trong đơn hàng
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        name: { type: String, required: true }, //tên sản phẩm tại thời điểm đặt hàng
        price: { type: Number, required: true }, //giá sản phẩm tại thời điểm đặt hàng
        quantity: { type: Number, required: true },
      },
    ],

    // tổng tiền đơn hàng
    totalAmount: { type: Number, required: true },

    // Thông tin thanh toán
    paymentInfo: {
      method: {
        type: String,
        enum: ['BankTransfer', 'ShoppingLoan'],
        required: true,
      },
      status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
      },
    },

    // Địa chỉ giao hàng (có thể khác địa chỉ của user)
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      zipCode: { type: String, required: true },
      address: { type: String, required: true },
    },

    // Trạng thái giao hàng
    shippingStatus: {
      type: String,
      enum: ['Processing', 'Shipped'],
      default: 'Processing',
    },

    // Ghi chú của User khi đặt hàng
    notes: { type: String },

    // Xóa mềm
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
