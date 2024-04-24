const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemId: { type: String, required: true, unique: true },
    itemName: String,
    category: String,
    price: Number,
    quantity: Number,
    userId: { type: String, required: true },
});

module.exports = mongoose.model('Item', itemSchema)