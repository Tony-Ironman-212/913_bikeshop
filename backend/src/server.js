const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// import cá nhân
// import routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const contactClientRoutes = require('./routes/contactClientRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const testTokenRoutes = require('./routes/testTokenRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(
  cors({
    origin: '*', //thay đổi theo domain của bạn
    credentials: true, //cho phép gửi cookie
  })
);
app.use(express.json());

//MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); //dừng server vì DB không kết nối được
  }
}
connectDB();

//routes
app.get('/', (req, res) => {
  res.send('Hello World! test server is running');
});
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact-client', contactClientRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/test-token', testTokenRoutes);
app.use('/api/orders', orderRoutes);

//start server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
