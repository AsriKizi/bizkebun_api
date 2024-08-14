const mongoose = require('mongoose');

const hargaSchema = new mongoose.Schema({
    tahun: { type: Number, required: true },
    harga_minggu: { type: [Number], required: true }  // Array of numbers representing weekly prices
});

const croptypeSchema = new mongoose.Schema({
    typeId: { type: Number, required: true, unique: true },
    typeName: String,
    duration: Number,
    harga: [hargaSchema]  // Array of hargaSchema
});

module.exports = mongoose.model('CropType', croptypeSchema);