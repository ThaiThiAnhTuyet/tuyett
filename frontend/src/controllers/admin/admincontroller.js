var express = require("express");
var router = express.Router();
var User = require("../../model/user");


router.get("/UserManage", function(req, res) {
    res.render("admin/UserManage/userManage.ejs");
});
router.get("/SanPhamManage/Create", function(req, res) {
    res.render("admin/SanPhamManage/Create.ejs");
});
router.get("/SanPhamManage/Delete", function(req, res) {
    res.render("admin/SanPhamManage/Delete.ejs");
});
router.get("/SanPhamManage/Details", function(req, res) {
    res.render("admin/SanPhamManage/Details.ejs");
});
router.get("/SanPhamManage/Edit", function(req, res) {
    res.render("admin/SanPhamManage/Edit.ejs");
});
router.get("/SanPhamManage/Index", function(req, res) {
    res.render("admin/SanPhamManage/Index.ejs");
});






module.exports = router;