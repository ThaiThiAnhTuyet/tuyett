//D:\DaiHocHutechKhoa2021\41.NgoNguPhatTrienMoi\website_bandienthoai_nodejs_javascript_mongodb\backend\src\models\role.js
const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50, unique: true },
    description: { type: String, maxlength: 250 }
});

const Role = mongoose.model("Role", RoleSchema);

// 🌟 Tạo sẵn dữ liệu mặc định
async function seedDefaultRoles() {
    const roles = [
        { name: "admin", description: "Quản trị viên toàn hệ thống" },
        { name: "user", description: "Người dùng thông thường" }
    ];

    for (const role of roles) {
        const exists = await Role.findOne({ name: role.name });
        if (!exists) {
            await Role.create(role);
            console.log(`✅ Đã thêm role: ${role.name}`);
        }
    }
}

module.exports = Role;
module.exports.seedDefaultRoles = seedDefaultRoles;