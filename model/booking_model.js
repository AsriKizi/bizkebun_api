const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingId: { type: Number, unique: true, required: true },
    customerId: { type: String, required: true },
    sellerId: { type: String, required: true },
    itemId: { type: Number, required: true },
    bookingStatus: Number,
    customerName: String,
    requestDate: String,
    price: Number,
    pricePerQuantity: Number,
    pricePerUnit: Number,
    quantity: Number,
    quantityUnit: Number,
    priceOffer: Number,
    pricePerQuantityOffer: Number,
    pricePerUnitOffer: Number,
    reason: String,
});

module.exports = mongoose.model('Booking', bookingSchema)