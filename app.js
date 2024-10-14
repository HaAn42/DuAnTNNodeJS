const express = require('express');
const connectDB = require('./config/database'); // Import hàm kết nối từ database.js
const userRoutes = require('./routers/userRoutes');
const productRouter = require('./routers/productRouter');
const cartRouter = require('./routers/cartRouter');
const app = express();
const port = 3000;

// Kết nối đến MongoDB
connectDB(); // Gọi hàm kết nối

// Middleware để xử lý JSON
app.use(express.json());

// Sử dụng routes 
app.use('/', userRoutes);
app.use('/', productRouter);
app.use('/', cartRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
