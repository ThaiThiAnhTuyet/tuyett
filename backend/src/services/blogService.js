const Blog = require("../models/Blog");
const mongoose = require("mongoose");

class BlogService {
    async getAll() {
        return await Blog.find().sort({ createdAt: -1 });
    }

    async getById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Blog.findById(id);
    }

    async create(data, authorFallback = null) {
        const blog = new Blog({
            title: data.title,
            content: data.content,
            author: data.author || authorFallback,
            thumbnail: data.thumbnail
        });

        return await blog.save();
    }

    async update(id, data) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Blog.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        return await Blog.findByIdAndDelete(id);
    }
}

module.exports = BlogService;
