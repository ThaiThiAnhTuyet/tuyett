var mongoose = require("mongoose");

var RoleSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50 },
    description: { type: String, maxlength: 250 }
});

module.exports = mongoose.model('Role', RoleSchema);