const axios = require("axios");
const BlogModel = require("../models/BlogModel");
const express = require("express");
const router = express.Router();

router.get("/blog", async function (req, res) {
    try {
        const response = await axios.get("http://localhost:5000/api/blog/list");
        const blogs = response.data.data.map(item => new BlogModel(item));
        res.render("BaiViet/blog", {
            blogs,
            user: req.session.user
        });
    } catch (err) {
        console.error("❌ Lỗi lấy danh sách blog:", err);
        res.render("BaiViet/blog", { blogs: [] });
    }
});

// ✅ Trang chi tiết bài viết
router.get("/blogdetails", async function (req, res) {
    try {
        const blogId = req.query.id;
        const response = await axios.get(`http://localhost:5000/api/blog/detail?id=${blogId}`);
        const blog = new BlogModel(response.data.data);
        res.render("BaiViet/blogdetails.ejs", {
            blog,
            user: req.session.user || null
        });
    } catch (err) {
        console.error("❌ Lỗi lấy chi tiết blog:", err);
        res.render("BaiViet/blogdetails.ejs", {
            blog: null,
            user: req.session.user || null
        });
    }
});

module.exports = router;
