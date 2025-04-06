const express = require("express");
const router = express.Router();
const checkRole = require("../middleware/checkRole");

// Route kiểm tra vai trò và điều hướng
router.get("/dashboard", checkRole, (req, res) => {
    if (req.isAdmin) {
        // Nếu là admin, điều hướng đến view admin
        return res.render("admin/dashboard", { user: req.session.user });
    } else {
        // Nếu là user, điều hướng đến view user
        return res.render("home", { user: req.session.user });
    }
});

module.exports = router;