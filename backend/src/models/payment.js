const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    method: { type: String, required: true },
    status: { type: Boolean, default: false }
});

module.exports = mongoose.model('Payment', PaymentSchema);
