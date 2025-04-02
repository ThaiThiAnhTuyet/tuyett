//D:\DaiHocHutechKhoa2021\41.NgoNguPhatTrienMoi\website_bandienthoai_nodejs_javascript_mongodb\backend\src\models\Blog.js
const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String },
    thumbnail: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Blog", BlogSchema);
