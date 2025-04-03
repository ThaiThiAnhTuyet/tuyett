const express = require("express");
const router = express.Router();
const axios = require("axios");
const ProductModel = require("../models/ProductModel");

// Route hiển thị danh sách sản phẩm
router.get("/product", async (req, res) => {
    try {
        // Gọi API để lấy danh sách sản phẩm
        const response = await axios.get("http://localhost:5000/api/product/product-list");
        
        // Xử lý dữ liệu về dạng ProductModel
        const products = response.data?.data?.map(item => new ProductModel(item)) || [];

        // Debug xem có dữ liệu không
        console.log("✅ Số sản phẩm lấy được:", products.length);

        // Render ra view và truyền dữ liệu
        res.render("SanPham/product", { products });

    } catch (err) {
        console.error("❌ Lỗi khi lấy sản phẩm từ API:", err.message);

        res.render("SanPham/product", {
            products: [],
            error: "Không thể hiển thị sản phẩm. Vui lòng thử lại sau."
        });
    }
});

// Các route khác
router.get("/productdetails", (req, res) => {
    res.render("SanPham/productdetails.ejs");
});

router.get("/shopcart", (req, res) => {
    res.render("SanPham/shopcart.ejs");
});

router.get("/shopwishlist", (req, res) => {
    res.render("SanPham/shopwishlist.ejs");
});

module.exports = router;
