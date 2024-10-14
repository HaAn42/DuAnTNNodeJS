const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Lấy tất cả sản phẩm
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy sản phẩm theo ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Thêm sản phẩm mới
router.post('/products', async (req, res) => {
    const { name_pr, brand, type, description, image_url, price, color, size, capacity } = req.body;
    try {
        const newProduct = new Product({
            name_pr,
            brand,
            type,
            description,
            image_url,
            price,
            color,
            size,
            capacity
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Cập nhật sản phẩm
router.put('/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updated_at: Date.now() },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Xóa sản phẩm
router.delete('/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        res.json({ message: 'Sản phẩm đã bị xóa' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
