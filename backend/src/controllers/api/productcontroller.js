//D:\DaiHocHutechKhoa2021\41.NgoNguPhatTrienMoi\website_bandienthoai_nodejs_javascript_mongodb\backend\src\controllers\api\productcontroller.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../../util/VerifyToken");

const ProductService = require("../../services/productService");
const productService = new ProductService();

// ✅ GET: Lấy tất cả sản phẩm
router.get("/product-list", verifyToken, async (req, res) => {
    try {
        const products = await productService.getAll();
        res.json({ status: true, data: products });
    } catch (err) {
        console.error("❌ Lỗi lấy sản phẩm:", err);
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
});

// ✅ GET: Lấy 1 sản phẩm theo ID
router.get("/product-detail", verifyToken, async (req, res) => {
    try {
        const product = await productService.getById(req.query.id);
        if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        res.json({ status: true, data: product });
    } catch (err) {
        console.error("❌", err);
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
});

// ✅ POST: Thêm sản phẩm
router.post("/add-product", verifyToken, async (req, res) => {
    try {
        const created = await productService.create(req.body);
        res.status(201).json({ status: true, message: "✅ Thêm sản phẩm thành công", data: created });
    } catch (err) {
        console.error("❌", err);
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
});

// ✅ PUT: Cập nhật sản phẩm
router.put("/update-product", verifyToken, async (req, res) => {
    try {
        const updated = await productService.update(req.body._id, req.body);
        if (!updated) return res.status(404).json({ message: "Không tìm thấy sản phẩm để cập nhật" });
        res.json({ status: true, message: "✅ Đã cập nhật sản phẩm", data: updated });
    } catch (err) {
        console.error("❌", err);
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
});

// ✅ DELETE: Xoá sản phẩm
router.delete("/delete-product", verifyToken, async (req, res) => {
    try {
        const deleted = await productService.delete(req.query.id);
        if (!deleted) return res.status(404).json({ message: "Không tìm thấy sản phẩm để xoá" });
        res.json({ status: true, message: "✅ Đã xoá sản phẩm", data: deleted });
    } catch (err) {
        console.error("❌", err);
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
});

module.exports = router;
