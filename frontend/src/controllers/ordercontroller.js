//D:\DaiHocHutechKhoa2021\41.NgoNguPhatTrienMoi\website_bandienthoai_nodejs_javascript_mongodb\frontend\src\controllers\ordercontroller.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const CartModel = require("../models/CartModel");
const OrderModel = require("../models/OrderModel");

// Route thêm vào giỏ hàng
router.post("/add-to-cart", async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const response = await axios.post("http://localhost:5000/api/order/add-to-cart", { productId, quantity });
        const cartItem = new CartModel(response.data);
        res.render("GioHang/add-to-cart", { cartItem, user: req.session.user });
    } catch (err) {
        console.error("❌ Lỗi thêm vào giỏ hàng:", err.message);
        res.render("GioHang/add-to-cart", { error: "Không thể thêm vào giỏ hàng." });
    }
});

// Route lấy giỏ hàng
router.get("/cart", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:5000/api/order/cart");
        const cartItems = response.data.cart.map(item => new CartModel(item));
        res.render("GioHang/cart", { cartItems, user: req.session.user });
    } catch (err) {
        console.error("❌ Lỗi lấy giỏ hàng:", err.message);
        res.render("GioHang/cart", { cartItems: [], error: "Không thể hiển thị giỏ hàng." });
    }
});

// Route xoá khỏi giỏ hàng
router.delete("/remove-from-cart", async (req, res) => {
    try {
        const { productId } = req.query;
        await axios.delete(`http://localhost:5000/api/order/remove-from-cart?productId=${productId}`);
        res.redirect("/order/cart");
    } catch (err) {
        console.error("❌ Lỗi xoá khỏi giỏ hàng:", err.message);
        res.redirect("/order/cart");
    }
});

// Route thanh toán
router.post("/checkout", async (req, res) => {
    try {
        const response = await axios.post("http://localhost:5000/api/order/checkout");
        const order = new OrderModel(response.data.order);
        res.render("DonHang/checkout", { order, user: req.session.user });
    } catch (err) {
        console.error("❌ Lỗi thanh toán:", err.message);
        res.render("DonHang/checkout", { error: "Không thể thực hiện thanh toán." });
    }
});

// Route xem lịch sử đơn hàng
router.get("/history", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:5000/api/order/history");
        const orders = response.data.orders.map(order => new OrderModel(order));
        res.render("DonHang/history", { orders, user: req.session.user });
    } catch (err) {
        console.error("❌ Lỗi xem lịch sử đơn hàng:", err.message);
        res.render("DonHang/history", { orders: [], error: "Không thể hiển thị lịch sử đơn hàng." });
    }
});

module.exports = router;
