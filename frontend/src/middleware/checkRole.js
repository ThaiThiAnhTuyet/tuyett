const axios = require("axios");

module.exports = async function (req, res, next) {
    const token = req.session.token;
    const role = req.session.role;

    if (!token) {
        return res.redirect("/login"); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    }

    try {
        // Kiểm tra token hợp lệ
        const response = await axios.get("http://localhost:5000/api/auth/test-security", {
            headers: { Authorization: `Bearer ${token}` }
        });

        // Kiểm tra role
        if (role === "admin") {
            return res.redirect("/UserManage");
        } else if (role === "user") {
            return res.redirect("/home");
        } else {
            return res.status(403).render("unauthorized", { message: "Vai trò không hợp lệ" });
        }
    } catch (err) {
        console.error("❌ Lỗi xác thực token:", err.message);
        return res.redirect("/login");
    }
};