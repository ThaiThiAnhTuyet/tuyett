const Category = require("../models/category");
const mongoose = require("mongoose");

class CategoryService {
    async getAll() {
        return await Category.find();
    }

    async create({ name }) {
        if (!name) throw new Error("Tên category là bắt buộc");
        const newCategory = new Category({ name });
        return await newCategory.save();
    }

    async update(_id, name) {
        if (!mongoose.Types.ObjectId.isValid(_id)) return null;
        return await Category.findByIdAndUpdate(_id, { name }, { new: true });
    }

    async delete(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Category.findByIdAndDelete(id);
    }
}

module.exports = CategoryService;
