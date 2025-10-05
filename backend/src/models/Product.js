const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ['bike', 'frame', 'wheel'] },
    name: { type: String, required: true },
    slug: { type: String, unique: true }, // bỏ required để cho nó auto gen
    price: { type: Number, required: true },
    stock: { type: Number, required: true, min: 0 },
    images: [String], //mảng URL hình ảnh
    description: {
      year: String,
      size: String,
      weight: String,
      sizeInfo: {
        topTube: String,
        seatTube: String,
      },
      specInfo: {
        group: String,
        wheel: String,
      },
      condition: [String],
    },
  },
  { timestamps: true }
);

//tự động tạo slug từ name
productSchema.pre('save', function (next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
