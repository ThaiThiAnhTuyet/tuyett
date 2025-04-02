//D:\DaiHocHutechKhoa2021\41.NgoNguPhatTrienMoi\website_bandienthoai_nodejs_javascript_mongodb\frontend\src\controllers\blogcontroller.js

var express = require("express");
var router = express.Router();

router.use("/blog", function(req, res) {
    // res.json({ "message": "this is product page " });
    res.render("BaiViet/blog.ejs");
});

// Route để hiển thị trang đăng ký
router.use("/blogdetails", function(req, res) {
    res.render("BaiViet/blogdetails.ejs");
});


module.exports = router;