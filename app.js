const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// controller
const userController =
    require('./controller/user_controller');
const itemController =
    require('./controller/item_controller');
const bookingController =
    require('./controller/booking_controller');
const auth = require('./controller/auth_controller');

// db connection
const app = express();
const port = process.env.PORT || 3000;

const mongoURI =
    'mongodb+srv://asrikizi:dev_BizKebun@bizkebun.yqvxi0r.mongodb.net/bizkebun?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// app use
app.use(express.json());
app.use(bodyParser.json());

// verify token
const authenticateToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ error: 'Access denied. Token not provided.' });

        const user = await auth.verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(403).json({ error: 'Invalid token.' });
    }
};

// user
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);
app.get('/allusers', userController.getAllUsers);

// item
app.post('/additem', authenticateToken, itemController.addItem);
app.post('/updateitemqty', authenticateToken, itemController.updateItemQty);
app.post('/searchitem', authenticateToken, itemController.searchItem);
app.get('/allitems', authenticateToken, itemController.getAllItems);

// booking
app.post('/addbooking', authenticateToken, bookingController.addBooking);
app.post('/updatebooking', authenticateToken, bookingController.updateBooking);
app.post('/getbookingbyitemid', authenticateToken, bookingController.getBookingByItemId);
app.post('/getbookingbyuserid', authenticateToken, bookingController.getBookingByUserId);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
