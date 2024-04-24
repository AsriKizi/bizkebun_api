const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingId: { type: String, unique: true, required: true },
    bookingStatus: Number, //0 = pending, 1 = confirm, 2 = rejected
    customerId: { type: String, required: true },
    customerName: String,
    requestDate: String,
    price: Number,
    quantity: Number,
    totalPrice: Number,
    itemId: { type: String, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema)