//D:\DaiHocHutechKhoa2021\41.NgoNguPhatTrienMoi\website_bandienthoai_nodejs_javascript_mongodb\frontend\src\controllers\index.js
var express = require("express");
var router = express.Router();

router.use("/home", require(__dirname + "/homecontroller"));
router.use("/", require(__dirname + "/categorycontroller"));
router.use("/", require(__dirname + "/productcontroller"));
router.use("/", require(__dirname + "/blogcontroller"));
router.use("/about", require(__dirname + "/aboutcontroller"));
router.use("/lienhe", require(__dirname + "/lienhecontroller"));
router.use("/order", require(__dirname + "/ordercontroller"));
router.use("/", require(__dirname + "/authenticatecontroller"));
router.use("/", require(__dirname + "/roleController")); // Thêm route kiểm tra vai trò

router.use("/", require(__dirname + "/admin/admincontroller"));


router.get("/", function(req, res) {
    res.render("index.ejs");
});
module.exports = router;