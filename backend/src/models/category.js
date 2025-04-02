//D:\DaiHocHutechKhoa2021\41.NgoNguPhatTrienMoi\website_bandienthoai_nodejs_javascript_mongodb\backend\src\models\category.js
var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('Category', CategorySchema);