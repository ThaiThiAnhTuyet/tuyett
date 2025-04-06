const express = require("express");
const router = express.Router();
const axios = require("axios");

// Mô hình Category (nếu cần map dữ liệu lại, bạn có thể tạo CategoryModel)
class CategoryModel {
    constructor(data) {
        this._id = data._id;
        this.name = data.name;
    }
}

// Route hiển thị danh sách category
router.get("/category", async (req, res) => {
    try {
        // Gọi API từ backend để lấy danh sách category
        const response = await axios.get("http://localhost:5000/api/category/category-list", {
            headers: {
                Authorization: `Bearer ${req.session.token}`, // Lấy token từ session đăng nhập
            },
        });

        // Chuyển dữ liệu sang dạng CategoryModel nếu cần
        const categories = response.data?.data?.map(item => new CategoryModel(item)) || [];

        console.log("✅ Số category lấy được:", categories.length);

        // Render ra view (ví dụ: views/DanhMuc/category.ejs)
        res.render("DanhMuc/category", { categories });

    } catch (err) {
        console.error("❌ Lỗi khi lấy category từ API:", err.message);

        res.render("DanhMuc/category", {
            categories: [],
            error: "Không thể hiển thị danh mục. Vui lòng thử lại sau."
        });
    }
});

module.exports = router;
