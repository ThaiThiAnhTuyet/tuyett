const express = require("express");
const router = express.Router();
const axios = require("axios");
const CartModel = require("../models/CartModel");
const OrderModel = require("../models/OrderModel");

// Route thêm sản phẩm vào giỏ hàng
router.post("/add-to-cart", async (req, res) => {
    try {
        const { productId } = req.body;
        const quantity = parseInt(req.body.quantity, 10) || 1;
        console.log("🛒 Add to cart:", { productId, quantity, raw: req.body.quantity, type: typeof req.body.quantity });

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


router.get("/cart", async (req, res) => {
    const token = req.session.token;

    if (!token) {
        return res.redirect("/login"); // Nếu chưa đăng nhập thì chuyển về trang đăng nhập
    }

    try {
        const response = await axios.get("http://localhost:5000/api/order/cart", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const cartItems = response.data.cart.map(item => new CartModel(item));
        res.render("GioHang/cart", {
            cartItems,
            user: req.session.user,
            token: req.session.token
        });

    } catch (err) {
        console.error("❌ Lỗi lấy giỏ hàng:", err.message);
        res.render("GioHang/cart", { cartItems: [], error: "Không thể hiển thị giỏ hàng.", user: req.session.user });
    }
});

router.post("/buy-now", async (req, res) => {
    const { productId } = req.body;
    const quantity = parseInt(req.body.quantity, 10) || 1;
    const token = req.session.token;

    if (!token) return res.redirect("/login");

    try {
        await axios.post(
            "http://localhost:5000/api/order/add-to-cart",
            { productId, quantity },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        const response = await axios.post(
            "http://localhost:5000/api/order/checkout",
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        const order = new OrderModel(response.data.order);
        res.render("GioHang/checkoutResult", {
            success: true,
            order,
            user: req.session.user
        });
    } catch (err) {
        console.error("❌ Lỗi mua ngay:", err.message);
        res.render("GioHang/checkoutResult", {
            success: false,
            errorMessage: "Không thể mua ngay lúc này.",
            user: req.session.user
        });
    }
});

router.delete("/remove-from-cart", async (req, res) => {
    const token = req.session.token;
    const productId = req.query.productId;

    if (!token) return res.status(401).json({ message: "Chưa đăng nhập" });

    try {
        await axios.delete(`http://localhost:5000/api/order/remove-from-cart?productId=${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        res.status(200).json({ message: "✅ Đã xóa khỏi giỏ hàng" });
    } catch (err) {
        console.error("❌ Lỗi xoá sản phẩm:", err.message);
        res.status(500).json({ message: "Lỗi xoá sản phẩm khỏi giỏ hàng" });
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
        res.render("GioHang/checkoutResult", {
            success: true,
            order,
            user: req.session.user
        });
    } catch (err) {
        console.error("❌ Lỗi thanh toán:", err.message);
        res.render("GioHang/checkoutResult", {
            success: false,
            errorMessage: "Không thể thực hiện thanh toán.",
            user: req.session.user
        });
    }
});

// Route xem lịch sử đơn hàng
router.get("/history", async (req, res) => {
    const token = req.session.token;

    if (!token) {
        return res.redirect("/login"); // ✅ Chặn nếu chưa đăng nhập
    }

    try {
        const response = await axios.get("http://localhost:5000/api/order/history", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const orders = response.data.orders.map(order => new OrderModel(order));
        res.render("GioHang/history", { orders, user: req.session.user });
    } catch (err) {
        console.error("❌ Lỗi xem lịch sử đơn hàng:", err.message);
        res.render("GioHang/history", { orders: [], error: "Không thể hiển thị lịch sử đơn hàng.", user: req.session.user });
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