const axios = require("axios");

module.exports = async function (req, res, next) {
    const token = req.session.token;

    if (!token) {
        return res.redirect("/login"); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    }

    try {
        // Gọi API để lấy thông tin người dùng
        const response = await axios.get("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
        });

        const user = response.data.user;
        req.session.user = user; // Lưu thông tin người dùng vào session

        if (user.role === "admin") {
            req.isAdmin = true; // Đánh dấu người dùng là admin
        } else {
            req.isAdmin = false; // Đánh dấu người dùng là user
        }

        next(); // Tiếp tục xử lý
    } catch (err) {
        console.error("❌ Lỗi kiểm tra vai trò người dùng:", err.message);
        return res.redirect("/login"); // Chuyển hướng đến trang đăng nhập nếu có lỗi
    }
};