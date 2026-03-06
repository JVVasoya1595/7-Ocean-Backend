const mongoose = require('mongoose');

const logoSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true }, altText: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Logo', logoSchema);