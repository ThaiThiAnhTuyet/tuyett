const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerAddress: { type: String, required: true },
    orderDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderDetail', required: true }]
});

module.exports = mongoose.model('Order', OrderSchema);
