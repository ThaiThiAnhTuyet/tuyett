const Product = require("../models/product");
const mongoose = require("mongoose");

class ProductService {
    async getAll() {
        return await Product.find().populate("category");
    }

    async getById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Product.findById(id).populate("category");
    }

    async create(data) {
        const product = new Product(data);
        return await product.save();
    }

    async update(id, data) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Product.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Product.findByIdAndDelete(id);
    }
}

module.exports = ProductService;
