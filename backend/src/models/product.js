//D:\DaiHocHutechKhoa2021\41.NgoNguPhatTrienMoi\website_bandienthoai_nodejs_javascript_mongodb\backend\src\models\product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    URLImage: { type: String },
    URLImage1: { type: String },
    URLImage2: { type: String },
    URLImage3: { type: String },
    URLImage4: { type: String }
});

module.exports = mongoose.model('Product', ProductSchema);
