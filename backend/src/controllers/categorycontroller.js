const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Category = require('../models/category');
const router = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Lấy danh sách các danh mục
 *     description: Trả về danh sách các danh mục
 *     tags:
 *       - Categories
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
 *                     example: "Danh mục 1"
 */

// API Lấy danh sách các danh mục
router.get("/categories", async(req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        console.error("❌ Lỗi khi lấy danh sách các danh mục:", err);
        res.status(500).json({ message: "❌ Lỗi server" });
    }
});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Thêm một danh mục mới
 *     description: API để tạo một danh mục mới với thông tin `name` và `description`.
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Danh mục mới"
 *               description:
 *                 type: string
 *                 example: "Mô tả danh mục mới"
 *     responses:
 *       201:
 *         description: Danh mục đã được tạo thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       500:
 *         description: Lỗi server
 */

// API thêm danh mục mới
router.post("/categories", async(req, res) => {
    try {
        const { name, description } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!name) {
            return res.status(400).json({ message: "❌ Vui lòng nhập tên danh mục" });
        }

        // Tạo danh mục mới
        const newCategory = new Category({
            _id: new mongoose.Types.ObjectId(),
            name,
            description
        });
        await newCategory.save();
        res.status(201).json({ message: "✅ Danh mục đã được thêm thành công!", category: newCategory });
    } catch (err) {
        console.error("❌ Lỗi khi thêm danh mục:", err);
        res.status(500).json({ message: "❌ Lỗi server" });
    }
});

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Sửa một danh mục
 *     description: API để sửa một danh mục với thông tin `name` và `description`.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của danh mục cần sửa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Danh mục sửa"
 *               description:
 *                 type: string
 *                 example: "Mô tả danh mục sửa"
 *     responses:
 *       200:
 *         description: Danh mục đã được sửa thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       404:
 *         description: Không tìm thấy danh mục
 *       500:
 *         description: Lỗi server
 */

// API sửa danh mục
router.put("/categories/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!name) {
            return res.status(400).json({ message: "❌ Vui lòng nhập tên danh mục" });
        }

        // Tìm và cập nhật danh mục
        const updatedCategory = await Category.findByIdAndUpdate(
            id, { name, description }, { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "❌ Không tìm thấy danh mục" });
        }

        res.status(200).json({ message: "✅ Danh mục đã được sửa thành công!", category: updatedCategory });
    } catch (err) {
        console.error("❌ Lỗi khi sửa danh mục:", err);
        res.status(500).json({ message: "❌ Lỗi server" });
    }
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Xóa một danh mục
 *     description: API để xóa một danh mục.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của danh mục cần xóa
 *     responses:
 *       200:
 *         description: Danh mục đã được xóa thành công
 *       404:
 *         description: Không tìm thấy danh mục
 *       500:
 *         description: Lỗi server
 */

// API xóa danh mục
router.delete("/categories/:id", async(req, res) => {
    try {
        const { id } = req.params;

        // Tìm và xóa danh mục
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "❌ Không tìm thấy danh mục" });
        }

        res.status(200).json({ message: "✅ Danh mục đã được xóa thành công!" });
    } catch (err) {
        console.error("❌ Lỗi khi xóa danh mục:", err);
        res.status(500).json({ message: "❌ Lỗi server" });
    }
});

module.exports = router;