const express = require("express");
const mongoose = require("mongoose");
const Product = require('../models/product');
const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lấy danh sách các sản phẩm
 *     description: Trả về danh sách các sản phẩm
 *     tags:
 *       - Products
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
 *                     example: "Sản phẩm 1"
 */

// API Lấy danh sách các sản phẩm
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error("❌ Lỗi khi lấy danh sách các sản phẩm:", err);
        res.status(500).json({ message: "❌ Lỗi server" });
    }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Thêm một sản phẩm mới
 *     description: API để tạo một sản phẩm mới với thông tin `name`, `price`, `description`, `category`, và các URL hình ảnh.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sản phẩm mới"
 *               price:
 *                 type: number
 *                 example: 100000
 *               description:
 *                 type: string
 *                 example: "Mô tả sản phẩm mới"
 *               category:
 *                 type: string
 *                 example: "65c123456789abcdef"
 *               URLImage:
 *                 type: string
 *                 example: "http://example.com/image.jpg"
 *               URLImage1:
 *                 type: string
 *                 example: "http://example.com/image1.jpg"
 *               URLImage2:
 *                 type: string
 *                 example: "http://example.com/image2.jpg"
 *               URLImage3:
 *                 type: string
 *                 example: "http://example.com/image3.jpg"
 *               URLImage4:
 *                 type: string
 *                 example: "http://example.com/image4.jpg"
 *     responses:
 *       201:
 *         description: Sản phẩm đã được tạo thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       500:
 *         description: Lỗi server
 */

// API thêm sản phẩm mới
router.post("/products", async (req, res) => {
    try {
        const { name, price, description, category, URLImage, URLImage1, URLImage2, URLImage3, URLImage4 } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!name || !price || !category) {
            return res.status(400).json({ message: "❌ Vui lòng nhập đầy đủ thông tin sản phẩm" });
        }

        // Tạo sản phẩm mới
        const newProduct = new Product({
            _id: new mongoose.Types.ObjectId(),
            name,
            price,
            description,
            category,
            URLImage,
            URLImage1,
            URLImage2,
            URLImage3,
            URLImage4
        });
        await newProduct.save();
        res.status(201).json({ message: "✅ Sản phẩm đã được thêm thành công!", product: newProduct });
    } catch (err) {
        console.error("❌ Lỗi khi thêm sản phẩm:", err);
        res.status(500).json({ message: "❌ Lỗi server" });
    }
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Sửa một sản phẩm
 *     description: API để sửa một sản phẩm với thông tin `name`, `price`, `description`, `category`, và các URL hình ảnh.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm cần sửa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sản phẩm sửa"
 *               price:
 *                 type: number
 *                 example: 120000
 *               description:
 *                 type: string
 *                 example: "Mô tả sản phẩm sửa"
 *               category:
 *                 type: string
 *                 example: "65c123456789abcdef"
 *               URLImage:
 *                 type: string
 *                 example: "http://example.com/image.jpg"
 *               URLImage1:
 *                 type: string
 *                 example: "http://example.com/image1.jpg"
 *               URLImage2:
 *                 type: string
 *                 example: "http://example.com/image2.jpg"
 *               URLImage3:
 *                 type: string
 *                 example: "http://example.com/image3.jpg"
 *               URLImage4:
 *                 type: string
 *                 example: "http://example.com/image4.jpg"
 *     responses:
 *       200:
 *         description: Sản phẩm đã được sửa thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       404:
 *         description: Không tìm thấy sản phẩm
 *       500:
 *         description: Lỗi server
 */

// API sửa sản phẩm
router.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category, URLImage, URLImage1, URLImage2, URLImage3, URLImage4 } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!name || !price || !category) {
            return res.status(400).json({ message: "❌ Vui lòng nhập đầy đủ thông tin sản phẩm" });
        }

        // Tìm và cập nhật sản phẩm
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, description, category, URLImage, URLImage1, URLImage2, URLImage3, URLImage4 },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "❌ Không tìm thấy sản phẩm" });
        }

        res.status(200).json({ message: "✅ Sản phẩm đã được sửa thành công!", product: updatedProduct });
    } catch (err) {
        console.error("❌ Lỗi khi sửa sản phẩm:", err);
        res.status(500).json({ message: "❌ Lỗi server" });
    }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Xóa một sản phẩm
 *     description: API để xóa một sản phẩm.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm cần xóa
 *     responses:
 *       200:
 *         description: Sản phẩm đã được xóa thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 *       500:
 *         description: Lỗi server
 */

// API xóa sản phẩm
router.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Tìm và xóa sản phẩm
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "❌ Không tìm thấy sản phẩm" });
        }

        res.status(200).json({ message: "✅ Sản phẩm đã được xóa thành công!" });
    } catch (err) {
        console.error("❌ Lỗi khi xóa sản phẩm:", err);
        res.status(500).json({ message: "❌ Lỗi server" });
    }
});

module.exports = router;