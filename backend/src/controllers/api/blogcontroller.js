//D:\DaiHocHutechKhoa2021\41.NgoNguPhatTrienMoi\website_bandienthoai_nodejs_javascript_mongodb\backend\src\controllers\api\authenticatecontroller.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../../util/VerifyToken");
const BlogService = require("../../services/blogService");
const blogService = new BlogService();

// ✅ GET: Lấy tất cả bài viết
router.get("/list", verifyToken, async (req, res) => {
    try {
        const blogs = await blogService.getAll();
        res.json({ status: true, data: blogs });
    } catch (err) {
        console.error("❌ Lỗi lấy danh sách blog:", err);
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
});

// ✅ GET: Lấy 1 bài viết theo ID
router.get("/detail", verifyToken, async (req, res) => {
    try {
        const blog = await blogService.getById(req.query.id);
        if (!blog) return res.status(404).json({ message: "Không tìm thấy bài viết" });
        res.json({ status: true, data: blog });
    } catch (err) {
        console.error("❌ Lỗi lấy bài viết:", err);
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
});

// ✅ POST: Thêm mới bài viết
router.post("/add", verifyToken, async (req, res) => {
    try {
        const created = await blogService.create(req.body, req.userData.user.name);
        res.status(201).json({ status: true, message: "✅ Đã tạo bài viết", data: created });
    } catch (err) {
        console.error("❌ Lỗi tạo bài viết:", err);
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
});

// ✅ PUT: Cập nhật bài viết
router.put("/update", verifyToken, async (req, res) => {
    try {
        const updated = await blogService.update(req.body._id, req.body);
        if (!updated) return res.status(404).json({ message: "Không tìm thấy bài viết để cập nhật" });
        res.json({ status: true, message: "✅ Đã cập nhật bài viết", data: updated });
    } catch (err) {
        console.error("❌ Lỗi cập nhật bài viết:", err);
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
});

// ✅ DELETE: Xoá bài viết
router.delete("/delete", verifyToken, async (req, res) => {
    try {
        const deleted = await blogService.delete(req.query.id);
        if (!deleted) return res.status(404).json({ message: "Không tìm thấy bài viết để xoá" });
        res.json({ status: true, message: "✅ Đã xoá bài viết", data: deleted });
    } catch (err) {
        console.error("❌ Lỗi xoá bài viết:", err);
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
});

module.exports = router;
