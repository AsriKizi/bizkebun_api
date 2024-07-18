const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    itemName: String,
    category: String,
    price: Number,
    pricePerQuantity: Number,
    pricePerUnit: String,
    quantity: Number,
    quantityUnit: String,
    harvestDate: String,
    itemImage: String,
});

module.exports = mongoose.model('Item', itemSchema)