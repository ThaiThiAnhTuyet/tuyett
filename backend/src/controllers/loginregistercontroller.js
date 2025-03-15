const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user");
const router = express.Router();

/**
 * @swagger
 * /getuserlist:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     description: Trả về danh sách người dùng (ẩn mật khẩu)
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "65c123456789abcdef"
 *                   name:
 *                     type: string
 *                     example: "Trịnh Tuấn Đan"
 *                   age:
 *                     type: integer
 *                     example: 22
 */

// API Lấy danh sách người dùng
router.get("/getuserlist", async(req, res) => {
    try {
        const users = await User.find().select("-password"); // Ẩn mật khẩu
        res.json(users);
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách người dùng:", error);
        res.status(500).json({ message: "❌ Lỗi server" });
    }
});


/**
 * @swagger
 * /adduser:
 *   post:
 *     summary: Thêm một người dùng mới (demo, không có mật khẩu)
 *     description: API để tạo một user mới với thông tin `name` và `age`.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nguyễn Văn B"
 *               age:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       201:
 *         description: User đã được tạo thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       500:
 *         description: Lỗi server
 */

// API thêm người dùng mới
router.post("/adduser", async(req, res) => {
    try {
        const { name, age } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!name || !age) {
            return res.status(400).json({ message: "❌ Vui lòng nhập đầy đủ thông tin" });
        }
        // Tạo user mới
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            age
        });
        await newUser.save();
        res.status(201).json({ message: "✅ Người dùng đã được thêm thành công!", user: newUser });
    } catch (error) {
        console.error("❌ Lỗi khi thêm người dùng:", error);
        res.status(500).json({ message: "❌ Lỗi server" });
    }
});

module.exports = router;