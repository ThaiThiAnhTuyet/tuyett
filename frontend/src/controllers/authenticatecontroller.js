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
        const user = new UserModel(response.data.user);
        req.session.user = user;
        res.redirect("/home");
    } catch (err) {
        res.render("NguoiDung/login", { error: "❌ Đăng nhập thất bại: " + (err.response?.data?.message || err.message) });
    }
});

// Trang cá nhân
router.get("/account", (req, res) => {
    const user = req.session.user;
    if (!user) return res.redirect("/login");
    res.render("NguoiDung/account", { user });
});

// Đăng xuất
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

module.exports = router;
