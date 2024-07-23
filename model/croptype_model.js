const mongoose = require('mongoose');

const croptypeSchema = new mongoose.Schema({
    typeId: { type: Number, required: true, unique: true },
    typeName: String,
    duration: Number,
});

module.exports = mongoose.model('CropType', croptypeSchema)