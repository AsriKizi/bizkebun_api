const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    cropId: { type: Number, unique: true, required: true },
    userId: { type: String, required: true },
    cropType: Number,
    cropStatus: Number,
    unit: Number,
    quantity: Number,
    harvestQuantity: Number,
    cropDate: String,
    harvestDate: String,
    negeri: Number,
    weekNumber: Number,
});

module.exports = mongoose.model('Crops', cropSchema)