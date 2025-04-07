const express = require("express");
const router = express.Router();
const axios = require("axios");
const CartModel = require("../models/CartModel");
const OrderModel = require("../models/OrderModel");

// Middleware kiểm tra người dùng đã đăng nhập
function ensureAuthenticated(req, res, next) {
    const token = req.session.token;
    if (!token) {
        return res.redirect("/login"); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    }
    next();
}

// Middleware kiểm tra vai trò user
router.use((req, res, next) => {
    if (req.session.role === "admin") {
        return res.status(403).render("unauthorized", {
            message: "Trang này chỉ dành cho người dùng."
        });
    }
    next();
});

// Route thêm vào giỏ hàng
router.post("/add-to-cart", ensureAuthenticated, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const token = req.session.token;

        const response = await axios.post(
            "http://localhost:5000/api/order/add-to-cart",
            { productId, quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const cartItem = new CartModel(response.data);
        res.render("GioHang/add-to-cart", { cartItem, user: req.session.user });
    } catch (err) {
        console.error("❌ Lỗi thêm vào giỏ hàng:", err.message);
        res.render("GioHang/add-to-cart", { error: "Không thể thêm vào giỏ hàng." });
    }
});

// Route lấy giỏ hàng
router.get("/cart", ensureAuthenticated, async (req, res) => {
    try {
        const token = req.session.token;

        const response = await axios.get("http://localhost:5000/api/order/cart", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const cartItems = response.data.cart.map(item => new CartModel(item));
        res.render("GioHang/cart", { cartItems, user: req.session.user });
    } catch (err) {
        console.error("❌ Lỗi lấy giỏ hàng:", err.message);
        res.render("GioHang/cart", { cartItems: [], error: "Không thể hiển thị giỏ hàng." });
    }
});

// Route xoá khỏi giỏ hàng
router.delete("/remove-from-cart", ensureAuthenticated, async (req, res) => {
    try {
        const { productId } = req.query;
        const token = req.session.token;

        await axios.delete(`http://localhost:5000/api/order/remove-from-cart?productId=${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        res.redirect("/order/cart");
    } catch (err) {
        console.error("❌ Lỗi xoá khỏi giỏ hàng:", err.message);
        res.redirect("/order/cart");
    }
});

// Route thanh toán
router.post("/checkout", ensureAuthenticated, async (req, res) => {
    try {
        const token = req.session.token;

        const response = await axios.post(
            "http://localhost:5000/api/order/checkout",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const order = new OrderModel(response.data.order);
        res.render("GioHang/checkout", { order, user: req.session.user });
    } catch (err) {
        console.error("❌ Lỗi thanh toán:", err.message);
        res.render("GioHang/checkout", { error: "Không thể thực hiện thanh toán." });
    }
});

// Route xem lịch sử đơn hàng
router.get("/history", ensureAuthenticated, async (req, res) => {
    try {
        const token = req.session.token;

        const response = await axios.get("http://localhost:5000/api/order/history", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const orders = response.data.orders.map(order => new OrderModel(order));
        res.render("GioHang/history", { orders, user: req.session.user });
    } catch (err) {
        console.error("❌ Lỗi xem lịch sử đơn hàng:", err.message);
        res.render("GioHang/history", { orders: [], error: "Không thể hiển thị lịch sử đơn hàng." });
    }
});

module.exports = router;