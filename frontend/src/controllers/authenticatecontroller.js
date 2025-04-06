//D:\DaiHocHutechKhoa2021\41.NgoNguPhatTrienMoi\website_bandienthoai_nodejs_javascript_mongodb\frontend\src\controllers\authenticatecontroller.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const UserModel = require("../models/UserModel");

// Đăng ký (form)
router.get("/register", (req, res) => {
    res.render("NguoiDung/register", { error: null });
});

// Xử lý đăng ký
router.post("/register", async (req, res) => {
    try {
        const body = { ...req.body, role: "user" }; // ✅ Gán mặc định role
        const response = await axios.post("http://localhost:5000/api/auth/register", body);

        const user = new UserModel(response.data.user);
        req.session.user = user;
        res.redirect("/login");
    } catch (err) {
        res.render("NguoiDung/register", {
            error: "❌ Đăng ký thất bại: " + (err.response?.data?.message || err.message)
        });
    }
});

// Đăng nhập (form)
router.get("/login", (req, res) => {
    res.render("NguoiDung/login", { error: null });
});

// Xử lý đăng nhập
router.post("/login", async (req, res) => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/login", req.body);
        const { token, user } = response.data;

        res.cookie("token", token, { httpOnly: true });
        req.session.token = token; // Lưu token vào session
        req.session.user = new UserModel(user); // Lưu thông tin user vào session dưới dạng UserModel

        if (user.role === "admin") {
            return res.redirect("/UserManage");
        } else {
            return res.redirect("/account"); // ⚠️ PHẢI LÀ /account mới đúng
        }
        
    } catch (err) {
        res.render("NguoiDung/login", { error: "❌ Đăng nhập thất bại: " + (err.response?.data?.message || err.message) });
    }
});

// Trang cá nhân
router.get("/account", async (req, res) => {
    const token = req.session.token;
    if (!token) return res.redirect("/login");

    try {
        // Gọi lại backend để lấy thông tin người dùng
        const response = await axios.get("http://localhost:5000/api/auth/test-security", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const user = response.data.user;
        req.session.user = user;

        res.render("NguoiDung/account", { user });
    } catch (err) {
        console.error("❌ Lỗi khi load trang account:", err.message);
        res.redirect("/login");
    }
});

// Đăng xuất
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

module.exports = router;
