const axios = require("axios");

module.exports = async function (req, res, next) {
    const token = req.session.token;
    if (!token) {
        return res.redirect("/login");
    }

    try {
        // ✅ Kiểm tra quyền admin
        await axios.get("http://localhost:5000/api/auth/admin-only", {
            headers: { Authorization: `Bearer ${token}` }
        });

        // ✅ Nếu chưa có user trong session → gọi thêm /api/auth/me
        if (!req.session.user) {
            const userRes = await axios.get("http://localhost:5000/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` }
            });
            req.session.user = userRes.data.user; // Gán vào session
        }
0
        next(); // ✅ Cho phép truy cập
    } catch (err) {
        console.error("❌ checkAdminToken error:", err.message);
        if (err.response?.status === 403) {
            return res.status(403).render("unauthorized", {
                message: "Bạn không có quyền truy cập vào trang quản trị."
            });
        }
        return res.redirect("/login");
    }
};
