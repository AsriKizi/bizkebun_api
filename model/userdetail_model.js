const mongoose = require('mongoose');

const userdetailSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    statusUser: Number,
    businessName: String,
    dateBirth: String,
    bio: String,
    address1: String,
    address2: String,
    latitude: String,
    longitude: String,
    usingws: Number,
    userImage: String,
});

module.exports = mongoose.model('UserDetail', userdetailSchema)