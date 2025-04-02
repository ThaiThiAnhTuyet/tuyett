//D:\DaiHocHutechKhoa2021\41.NgoNguPhatTrienMoi\website_bandienthoai_nodejs_javascript_mongodb\backend\src\models\user.js
var mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,// ID người dùng
    name: { type: String, required: true },// Tên người dùng
    age: { type: Number, required: true },// Tuổi
    password: { type: String, required: true }, // Mật khẩu
    role: { type: String, required: true, default: "user" }
});

// Model name là 'User', Mongo sẽ tạo collection là 'users'
module.exports = mongoose.model("User", UserSchema);
