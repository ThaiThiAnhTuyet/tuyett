const express = require("express");
const router = express.Router();
const axios = require("axios");
const CartModel = require("../models/CartModel");
const OrderModel = require("../models/OrderModel");

// Route thêm sản phẩm vào giỏ hàng
router.post("/add-to-cart", async (req, res) => {
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

        res.redirect("/order/cart"); // Chuyển hướng đến giỏ hàng sau khi thêm
    } catch (err) {
        console.error("❌ Lỗi thêm vào giỏ hàng:", err.message);
        res.redirect("/productdetails/" + req.body.productId);
    }
});

// Route hiển thị giỏ hàng
router.get("/cart", async (req, res) => {
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

//cập nhật số lượng sản phẩm trong giỏ hàng
router.post("/update-cart", async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const token = req.session.token;

        const response = await axios.post(
            "http://localhost:5000/api/order/update-cart",
            { productId, quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        res.redirect("/order/cart");
    } catch (err) {
        console.error("❌ Lỗi cập nhật giỏ hàng:", err.message);
        res.redirect("/order/cart");
    }
});

// Route xóa sản phẩm khỏi giỏ hàng
router.post("/remove-from-cart", async (req, res) => {
    try {
        const { productId } = req.body;
        const token = req.session.token;

        await axios.delete(`http://localhost:5000/api/order/remove-from-cart?productId=${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        res.redirect("/order/cart");
    } catch (err) {
        console.error("❌ Lỗi xóa khỏi giỏ hàng:", err.message);
        res.redirect("/order/cart");
    }
});

// Route thanh toán
router.post("/checkout", async (req, res) => {
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
router.get("/history", async (req, res) => {
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

// Nút thêm sản phẩm vào giỏ hàng
// http://localhost:5000/api/order/add-to-cart
// xem danh sách giỏ hàng
// http://localhost:5000/api/order/cart
// Xóa 1 sản phẩm trong giỏ hàng
// http://localhost:5000/api/order/remove-from-cart?productId=67f2ef395a6ab1e81ef6001c
// Nút bấm Thanh Toán
// http://localhost:5000/api/order/checkout
// xem lịch sử đơn hàng đã thanh toántoán