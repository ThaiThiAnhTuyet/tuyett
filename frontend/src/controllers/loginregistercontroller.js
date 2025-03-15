var express = require("express");
var router = express.Router();

// Route để hiển thị trang đăng nhập
router.get("/login", function(req, res) {
    res.render("NguoiDung/login.ejs");
});

// Route để hiển thị trang đăng ký
router.get("/register", function(req, res) {
    res.render("NguoiDung/register.ejs");
});
// Xử lý đăng ký người dùng (Gửi API lên Backend)
router.post("/register", async function(req, res) {
    try {
        const { name, email, password } = req.body;
        const response = await axios.post("http://localhost:5000/api/register", { name, email, password });

        res.redirect("/login");
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        res.status(500).send("❌ Lỗi khi đăng ký");
    }
});

// Route để hiển thị trang thông tin Người Dùng
router.get("/account", function(req, res) {
    res.render("NguoiDung/account.ejs");
});

module.exports = router;