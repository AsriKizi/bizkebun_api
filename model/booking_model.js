const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingId: { type: String, unique: true, required: true },
    customerId: { type: String, required: true },
    itemId: { type: String, required: true },
    bookingStatus: Number,
    customerName: String,
    requestDate: String,
    price: Number,
    pricePerQuantity: Number,
    pricePerUnit: String,
    quantity: Number,
    quantityUnit: String,
    priceOffer: Number,
    pricePerQuantityOffer: Number,
    pricePerUnitOffer: String,
    reason: String,
});

module.exports = mongoose.model('Booking', bookingSchema)