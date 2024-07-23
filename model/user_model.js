const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userPhone: { type: String, unique: true, required: true },
    userName: { type: String, required: true },
    userPwd: { type: String, required: true },
    userRole: Number, // 0-farmer, 1-merchant,
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('userPwd') || user.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.userPwd, salt);
            user.userPwd = hash;
            next();
        } catch (error) {
            return next(error);
        }
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (userPwd) {
    return bcrypt.compare(userPwd, this.userPwd);
};

module.exports = mongoose.model('User', userSchema);