const Booking = require('../model/booking_model');
const Item = require('../model/item_model');
const UserDetail = require('../model/userdetail_model');

async function addBooking(req, res) {
    try {
        const {
            customerId, sellerId, itemId, customerName, requestDate, price, pricePerQuantity, pricePerUnit, quantity, quantityUnit, priceOffer, pricePerQuantityOffer, pricePerUnitOffer, reason,
        } = req.body;
        const booking = await Booking.find();
        var bookingId = 0;
        if (booking.length != 0) {
            bookingId = booking[booking.length - 1].bookingId + 1;
        }
        const bookingStatus = 0;
        const newBooking = new Booking({
            bookingId, bookingStatus, customerId, sellerId, itemId, customerName, requestDate, price, pricePerQuantity, pricePerUnit, quantity, quantityUnit, priceOffer, pricePerQuantityOffer, pricePerUnitOffer, reason,
        });
        //create booking
        const savedBooking = await newBooking.save();
        if (savedBooking) {
            res.status(200).json({ message: 'Add booking successful', savedBooking });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
        });
    }
}

async function updateBooking(req, res) {
    try {
        const { bookingId, bookingStatus, priceOffer, pricePerQuantityOffer, pricePerUnitOffer, reason,
        } = req.body;
        const updateBooking = await Booking.findOneAndUpdate({ bookingId: bookingId },
            { $set: { bookingStatus, priceOffer, pricePerQuantityOffer, pricePerUnitOffer, reason, } },
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
                res.status(200).json({ message: 'Update booking successful', updateBooking, updatedItem, reason: reason });
            }
        } else {
            if (updateBooking) {
                res.status(200).json({ message: 'Update booking successful', updateBooking, reason: reason });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
        });
    }
}

async function deleteBookingById(req, res) {
    try {
        const { bookingId } = req.body;
        const deletedBooking = await Booking.deleteOne({ bookingId: bookingId });

        if (deletedBooking.deletedCount === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
        });
    }
}

async function getBookingByItemId(req, res) {
    try {
        const { itemId
        } = req.body;
        const booking = await Booking.find({ itemId: itemId });
        if (!booking || booking.length === 0) {
            return res.status(404).json({ error: 'No bookings found' });
        }
        res.status(200).json({ data: booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
        });
    }
}

async function getBookingByUserId(req, res) {
    try {
        const { userId } = req.body;
        const bookings = await Booking.find({ customerId: userId });
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ error: 'No bookings found' });
        }
        const bookingDetails = await Promise.all(bookings.map(async (booking) => {
            const item = await Item.findOne({ itemId: booking.itemId });
            const seller = await UserDetail.findOne({ userId: booking.sellerId });
            return {
                booking,
                item,
                seller
            };
        }));
        res.status(200).json({ data: bookingDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getUsersItemBooking(req, res) {
    try {
        const { userId } = req.body;
        const items = await Item.find({ userId: userId });
        if (!items || items.length === 0) {
            return res.status(404).json({ error: 'No items found for this user' });
        }
        const itemIds = items.map(item => item.itemId);
        const bookings = await Booking.find({ itemId: { $in: itemIds } });
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ error: 'No bookings found for these items' });
        }
        const bookingDetails = await Promise.all(bookings.map(async (booking) => {
            const item = items.find(item => item.itemId === booking.itemId);
            const customer = await UserDetail.findOne({ userId: booking.customerId });
            return {
                booking,
                item,
                customer
            };
        }));
        res.status(200).json({ data: bookingDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    addBooking,
    updateBooking,
    getBookingByItemId,
    getBookingByUserId,
    deleteBookingById,
    getUsersItemBooking,
};