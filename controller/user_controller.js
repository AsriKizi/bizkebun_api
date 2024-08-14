const User = require('../model/user_model');
const auth = require('./auth_controller');
const UserDetail = require('../model/userdetail_model');

async function addUserDetails(req, res) {
    try {
        const {
            userId, statusUser, businessName, dateBirth, bio,
            address1, address2, latitude, longitude, usingws, userImage
        } = req.body;
        const searchuser = await UserDetail.find({ userId: userId });
        if (!searchuser || searchuser.length == 0) {
            const userDetails = new UserDetail({
                userId, statusUser, businessName, dateBirth, bio,
                address1, address2, latitude, longitude, usingws, userImage
            });
            await userDetails.save();
            res.status(200).json({ message: 'User details added successfully', data: userDetails });
        } else {
            const userDetails = await UserDetail.findOneAndUpdate({
                userId: userId
            }, {
                $set: {
                    statusUser, businessName, dateBirth, bio,
                    address1, address2, latitude, longitude, usingws, userImage
                }
            },
                { new: true });
            await userDetails.save();
            res.status(200).json({ message: 'User details added successfully', data: userDetails });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function registerUser(req, res) {
    try {
        const {
            userName, userPhone, userPwd, userRole,
        } = req.body;
        const newUser = new User({
            userName, userPhone, userPwd, userRole,
        });
        const savedUser = await newUser.save();
        res.status(200).json({ message: 'Register successful', savedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

async function loginUser(req, res) {
    try {
        const { userPhone, userPwd,
        } = req.body;
        console.log('userPhone :', userPhone);
        const requestedUser = await User.findOne({ userPhone: userPhone });
        if (!requestedUser) {
            res.status(401).json({ error: 'userPhone not found' });
        } else {
            const isPasswordValid = await requestedUser.comparePassword(userPwd);
            if (!isPasswordValid) {
                res.status(401).json({ error: 'Invalid password' });
            }
            if (requestedUser && isPasswordValid) {
                const userdetails = await UserDetail.findOne({userId: userPhone}) || null;
                const token = auth.generateToken({ userPhone: requestedUser.userPhone, userId: requestedUser._id });
                res.status(200).json({ message: 'Login successful', requestedUser, userdetails, token });
            }
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
    addUserDetails,
};
