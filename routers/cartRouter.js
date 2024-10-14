const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Lấy giỏ hàng theo user_id
router.get('/cart/:user_id', async (req, res) => {
    try {
        const cart = await Cart.findOne({ user_id: req.params.user_id }).populate('products.product_id');
        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Thêm sản phẩm vào giỏ hàng
router.post('/cart/:user_id', async (req, res) => {
    const { product_id, quantity } = req.body;

    try {
        // Tìm sản phẩm
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        // Tìm giỏ hàng của người dùng
        let cart = await Cart.findOne({ user_id: req.params.user_id });

        if (cart) {
            // Nếu đã có giỏ hàng, kiểm tra sản phẩm đã tồn tại trong giỏ chưa
            const existingProductIndex = cart.products.findIndex(p => p.product_id.equals(product_id));
            if (existingProductIndex > -1) {
                // Nếu sản phẩm đã tồn tại, cập nhật số lượng
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                // Nếu sản phẩm chưa có, thêm vào giỏ
                cart.products.push({ product_id, quantity });
            }
        } else {
            // Nếu chưa có giỏ hàng, tạo giỏ hàng mới
            cart = new Cart({
                user_id: req.params.user_id,
                products: [{ product_id, quantity }]
            });
        }

        // Lưu giỏ hàng
        const savedCart = await cart.save();
        res.status(201).json(savedCart);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Xóa sản phẩm khỏi giỏ hàng
router.delete('/cart/:user_id/:product_id', async (req, res) => {
    try {
        const cart = await Cart.findOne({ user_id: req.params.user_id });
        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }

        // Tìm sản phẩm và xóa khỏi giỏ
        cart.products = cart.products.filter(p => !p.product_id.equals(req.params.product_id));

        // Lưu giỏ hàng sau khi cập nhật
        const updatedCart = await cart.save();
        res.json(updatedCart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
