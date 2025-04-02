//D:\DaiHocHutechKhoa2021\41.NgoNguPhatTrienMoi\website_bandienthoai_nodejs_javascript_mongodb\frontend\src\controllers\productcontroller.js
const axios = require("axios");
const express = require("express");
const router = express.Router();
const ProductModel = require("../models/ProductModel");

// Route hiển thị danh sách sản phẩm
router.get("/product", async function (req, res) {
    try {
        const apiRes = await axios.get("http://localhost:5000/api/product-list", {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });

        const products = apiRes.data.data.map(item => new ProductModel(item));
        res.render("SanPham/product", { products });

    } catch (err) {
        console.error("❌ Lỗi khi load sản phẩm:", err);
        res.render("SanPham/product", { products: [], error: "Không thể lấy danh sách sản phẩm" });
    }
});

router.get("/productdetails", function(req, res) {
    res.render("SanPham/productdetails.ejs");
});

router.get("/shopcart", function(req, res) {
    res.render("SanPham/shopcart.ejs");
});

router.get("/shopwishlist", function(req, res) {
    res.render("SanPham/shopwishlist.ejs");
});

module.exports = router;