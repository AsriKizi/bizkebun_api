const User = require('../model/user_model');
const auth = require('./auth_controller');

async function registerUser(req, res) {
    try {
        const {
            userName, userEmail, userPwd, userRole,
        } = req.body;
        const newUser = new User({
            userName, userEmail, userPwd, userRole,
        });
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'Register successful', savedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

async function loginUser(req, res) {
    try {
        const { userName, userPwd,
        } = req.body;
        console.log('username :',userName);
        const requestedUser = await User.findOne({ userName: userName });
        if (!requestedUser) {
            res.status(401).json({ error: 'Username not found' });
        }
        const isPasswordValid = await requestedUser.comparePassword(userPwd);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid password' });
        }
        if (requestedUser && isPasswordValid) {
            const token = auth.generateToken({ userName: requestedUser.userName, userId: requestedUser._id });
            res.status(201).json({ message: 'Login successful', requestedUser , token});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

async function getAllUsers(req, res) {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
};
