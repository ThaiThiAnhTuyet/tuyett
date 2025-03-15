const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Role = require('../models/role');
const router = express.Router();


router.get = async(req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createRole = async(req, res) => {
    const role = new Role(req.body);
    try {
        const newRole = await role.save();
        res.status(201).json(newRole);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};