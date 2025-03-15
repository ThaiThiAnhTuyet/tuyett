const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Payment = require('../models/payment');
const router = express.Router();


exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPayment = async (req, res) => {
    const payment = new Payment(req.body);
    try {
        const newPayment = await payment.save();
        res.status(201).json(newPayment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};