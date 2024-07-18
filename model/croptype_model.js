const mongoose = require('mongoose');

const croptypeSchema = new mongoose.Schema({
    typeId: { type: String, required: true, unique: true },
    typeName: String,
    duration: Number,
});

module.exports = mongoose.model('CropType', croptypeSchema)