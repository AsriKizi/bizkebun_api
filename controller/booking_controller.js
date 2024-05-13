const Booking = require('../model/booking_model');
const Item = require('../model/item_model');

async function addBooking(req, res) {
    try {
        const {
            customerId, customerName, requestDate, price, quantity, totalPrice, itemId
        } = req.body;
        const currentDatetime = new Date();
        const formattedDatetime = currentDatetime.toISOString().replace(/[-T:.Z]/g, ''); // Format: YYYYMMDDHHmmss
        const bookingId = `${customerName}${formattedDatetime}`;
        const bookingStatus = 0;
        const newBooking = new Booking({
            bookingId, bookingStatus, customerId, customerName, requestDate, price, quantity, totalPrice, itemId
        });
        //create booking
        const savedBooking = await newBooking.save();
        if (savedBooking) {
            res.status(200).json({ message: 'Add booking successful', savedBooking });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

async function updateBooking(req, res) {
    try {
        const { bookingId, bookingStatus, rejectionreason,
        } = req.body;
        const updateBooking = await Booking.findOneAndUpdate({ bookingId: bookingId },
            { $set: { bookingStatus } },
            { new: true });

        if (bookingStatus == 1) {
            //get item
            const itemToDeductQty = await Item.findOne({ itemId: updateBooking.itemId });
            if (!itemToDeductQty) {
                return res.status(404).json({ error: 'Item to book not found' });
            }
            if (itemToDeductQty.quantity < updateBooking.quantity) {
                return res.status(400).json({ error: 'Insufficient quantity available' });
            }
            itemToDeductQty.quantity -= updateBooking.quantity;
            const updatedItem = await Item.findOneAndUpdate({ itemId: updateBooking.itemId }, itemToDeductQty,
                { new: true });

            if (updatedItem) {
                res.status(200).json({ message: 'Update booking successful', updateBooking, updatedItem, rejectionreason: rejectionreason });
            }
        } else {
            if (updateBooking) {
                res.status(201).json({ message: 'Update booking successful', updateBooking, rejectionreason: rejectionreason });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

async function getBookingByItemId(req, res) {
    try {
        const { itemId
        } = req.body;
        const booking = await Booking.find({ itemId: itemId });
        res.status(200).json({data : booking});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

async function getBookingByUserId(req, res) {
    try {
        const { userId
        } = req.body;
        const booking = await Booking.find({ customerId: userId });
        res.status(200).json({data : booking});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

module.exports = {
    addBooking,
    updateBooking,
    getBookingByItemId,
    getBookingByUserId,
};