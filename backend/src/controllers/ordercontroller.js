const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Order = require('../models/order');
const router = express.Router();

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('orderDetails');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createOrder = async (req, res) => {
    const order = new Order(req.body);
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};