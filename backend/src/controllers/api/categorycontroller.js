//D:\DaiHocHutechKhoa2021\41.NgoNguPhatTrienMoi\website_bandienthoai_nodejs_javascript_mongodb\backend\src\controllers\api\authenticatecontroller.js
const express = require("express");
const router = express.Router();

const verifyToken = require("../../util/VerifyToken");
const checkRole = require("../../util/checkRole");
const CategoryService = require("../../services/categoryService");

const categoryService = new CategoryService();

// ✅ GET: Lấy danh sách category
router.get("/category-list", verifyToken, checkRole("admin"), async (req, res) => {
    try {
        const categories = await categoryService.getAll();
        res.json({ status: true, data: categories });
    } catch (err) {
        console.error("❌ Lỗi lấy danh sách category:", err);
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
});

// ✅ POST: Thêm category mới
router.post("/add-category", verifyToken, checkRole("admin"), async (req, res) => {
    try {
        const created = await categoryService.create(req.body);
        res.status(201).json({ status: true, message: "✅ Đã thêm category", data: created });
    } catch (err) {
        res.status(400).json({ status: false, message: "❌ " + err.message });
    }
});

// ✅ PUT: Cập nhật category
router.put("/update-category", verifyToken, checkRole("admin"), async (req, res) => {
    try {
        const updated = await categoryService.update(req.body._id, req.body.name);
        if (!updated) return res.status(404).json({ status: false, message: "Không tìm thấy category" });

        res.json({ status: true, message: "✅ Đã cập nhật category", data: updated });
    } catch (err) {
        res.status(500).json({ status: false, message: "❌ Lỗi server" });
    }
});

// ✅ DELETE: Xoá category
router.delete("/delete-category", verifyToken, checkRole("admin"), async (req, res) => {
    try {
        const deleted = await categoryService.delete(req.query.id);
        if (!deleted) return res.status(404).json({ status: false, message: "Không tìm thấy category để xoá" });

        res.json({ status: true, message: "✅ Đã xoá category", data: deleted });
    } catch (err) {
        res.status(500).json({ status: false, message: "❌ Lỗi server" });
    }
});

module.exports = router;
