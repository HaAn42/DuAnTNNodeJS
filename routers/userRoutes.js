const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Tạo người dùng mới
router.post('/users', async (req, res) => {
    try {
        const { email, phone_number, password, name, address } = req.body;

        // Kiểm tra xem email hoặc số điện thoại đã tồn tại (chỉ kiểm tra phone_number nếu có)
        const existingUser = await User.findOne({
            $or: [
                { email },
                ...(phone_number ? [{ phone_number }] : []) // Nếu phone_number tồn tại, thêm vào điều kiện kiểm tra
            ]
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email hoặc số điện thoại đã được sử dụng.' });
        }

        const newUser = new User({ email, phone_number, password, name, address });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
});
// Đăng nhập người dùng
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm người dùng theo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }

        // Kiểm tra mật khẩu (giả sử bạn đã mã hóa mật khẩu khi lưu trữ)
        const isMatch = user.password === password; // Thay thế bằng cách mã hóa mật khẩu thật sự
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu không chính xác.' });
        }

        // Đăng nhập thành công
        res.status(200).json({ message: 'Đăng nhập thành công!', user });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
});

// Lấy danh sách người dùng
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
});

// Cập nhật thông tin người dùng
router.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
});

// Xóa người dùng
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }
        res.json({ message: 'Đã xóa người dùng.' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
});

module.exports = router;
