const Cart = require("../models/cart");
const Order = require("../models/order");
const Product = require("../models/product");
const mongoose = require("mongoose");

class OrderService {
    async addToCart(userId, productId, quantity) {
        const existing = await Cart.findOne({ userId, productId });
        if (existing) {
            existing.quantity += quantity;
            await existing.save();
            return existing;
        } else {
            return await Cart.create({ userId, productId, quantity });
        }
    }

    async getCart(userId) {
        return await Cart.find({ userId }).populate("productId");
    }

    async removeFromCart(userId, productId) {
        return await Cart.findOneAndDelete({ userId, productId });
    }

    async checkout(userId) {
        const cartItems = await Cart.find({ userId });
        if (!cartItems.length) throw new Error("Giỏ hàng rỗng");

        let total = 0;
        const products = [];

        for (const item of cartItems) {
            const product = await Product.findById(item.productId);
            if (!product) continue;

            total += product.price * item.quantity;
            products.push({ productId: item.productId, quantity: item.quantity });
        }

        const order = new Order({ userId, products, totalAmount: total });
        await order.save();
        await Cart.deleteMany({ userId });

        return order;
    }

    async getOrderHistory(userId) {
        return await Order.find({ userId })
            .populate("products.productId")
            .sort({ paidAt: -1 });
    }
}

module.exports = OrderService;
