const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemId: { type: Number, required: true, unique: true },
    userId: { type: String, required: true },
    itemName: String,
    category: Number,
    price: Number,
    pricePerQuantity: Number,
    pricePerUnit: Number,
    quantity: Number,
    quantityUnit: Number,
    harvestDate: String,
    itemImage: String,
});

module.exports = mongoose.model('Item', itemSchema)