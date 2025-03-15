var express = require("express");
var router = express.Router();

router.get("/product", function(req, res) {
    res.render("SanPham/product.ejs");
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