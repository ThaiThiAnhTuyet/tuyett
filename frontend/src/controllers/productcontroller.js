const express = require("express");
const router = express.Router();
const axios = require("axios");
const ProductModel = require("../models/ProductModel");
const CategoryModel = require("../models/CategoryModel");

// Route hiển thị danh sách sản phẩm
router.get("/product", async (req, res) => {
    try {
        const categoryId = req.query.category;

        const productApiUrl = categoryId
            ? `http://localhost:5000/api/product/product-list?category=${categoryId}`
            : `http://localhost:5000/api/product/product-list`;

        const [productRes, categoryRes] = await Promise.all([
            axios.get(productApiUrl),
            axios.get("http://localhost:5000/api/category/category-list")
        ]);

        const products = productRes.data?.data?.map(item => new ProductModel(item)) || [];
        const categories = categoryRes.data?.data?.map(item => new CategoryModel(item)) || [];

        res.render("SanPham/product", {
            products,
            categories,
            selectedCategory: categoryId || "",
            user: req.session.user,user: req.session.user
        });

    } catch (err) {
        console.error("❌ Lỗi khi lấy dữ liệu:", err.message);
        res.render("SanPham/product", {
            products: [],
            categories: [],
            error: "Không thể hiển thị sản phẩm.",
            selectedCategory: ""
        });
    }
});

// Các route khác
router.get("/productdetails/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        const productRes = await axios.get(`http://localhost:5000/api/product/product-detail?id=${productId}`);
        const productData = productRes.data?.data;
        const product = new ProductModel(productData);

        res.render("SanPham/productdetails", { product, user: req.session.user });
    } catch (err) {
        console.error("❌ Lỗi lấy chi tiết sản phẩm:", err.message);
        res.render("SanPham/productdetails", {
            product: null,
            error: "Không thể hiển thị chi tiết sản phẩm."
        });
    }
});


module.exports = router;
