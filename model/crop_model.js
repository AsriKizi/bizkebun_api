const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    cropId: { type: Number, unique: true, required: true },
    userId: { type: String, required: true },
    cropType: Number,
    cropStatus: Number,
    requestDate: String,
    unit: Number,
    quantity: Number,
    cropDate: String,
    harvestDate: String,
});

module.exports = mongoose.model('Crops', cropSchema)