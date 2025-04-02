const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

class UserService {
    async register({ name, age, password, role }) {
        if (!name || !age || !password) throw new Error("Thiếu thông tin");

        const existingUser = await User.findOne({ name });
        if (existingUser) throw new Error("Tên đã tồn tại");

        const userRole = role || "user";
        const roleExists = await Role.findOne({ name: userRole });
        if (!roleExists) throw new Error(`Vai trò ${userRole} không hợp lệ`);

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            age,
            password: hashedPassword,
            role: userRole
        });

        await newUser.save();
        return newUser;
    }

    async login({ name, password }) {
        const user = await User.findOne({ name });
        if (!user) throw new Error("Tài khoản không tồn tại");

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Sai mật khẩu");

        return user;
    }

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }

    async updateUser(data) {
        const updateFields = {};
        if (data.name) updateFields.name = data.name;
        if (data.age) updateFields.age = data.age;
        if (data.role) updateFields.role = data.role;
        if (data.password) {
            updateFields.password = await bcrypt.hash(data.password, 10);
        }
        return await User.findByIdAndUpdate(data._id, updateFields, { new: true });
    }

    async getAllUsers() {
        return await User.find().select("-password");
    }

    async getUserById(id) {
        return await User.findById(id).select("-password");
    }
}

module.exports = UserService;
