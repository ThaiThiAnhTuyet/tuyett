const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const OrderDetail = require('../models/orderDetail');
const router = express.Router();


exports.getAllOrderDetails = async (req, res) => {
    try {
        const details = await OrderDetail.find().populate('product order');
        res.json(details);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createOrderDetail = async (req, res) => {
    const detail = new OrderDetail(req.body);
    try {
        const newDetail = await detail.save();
        res.status(201).json(newDetail);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
