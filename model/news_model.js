const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    newsId: { type: Number, required: true, unique: true },
    newsName: String,
    newsURL: String,
});

module.exports = mongoose.model('News', newsSchema)