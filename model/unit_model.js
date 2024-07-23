const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    unitId: { type: Number, required: true, unique: true },
    unitName: String,
});

module.exports = mongoose.model('Unit', unitSchema)