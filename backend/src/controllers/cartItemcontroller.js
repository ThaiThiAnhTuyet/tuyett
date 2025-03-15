const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const CartItem = require('../models/cartItem');
const router = express.Router();

exports.getAllCartItems = async (req, res) => {
    try {
        const items = await CartItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCartItem = async (req, res) => {
    const item = new CartItem(req.body);
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};