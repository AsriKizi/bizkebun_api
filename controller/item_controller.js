const Item = require('../model/item_model');

async function addItem(req, res) {
    try {
        const {
            userId, itemName, category, price, quantity,
        } = req.body;
        const currentDatetime = new Date();
        const formattedDatetime = currentDatetime.toISOString().replace(/[-T:.Z]/g, ''); // Format: YYYYMMDDHHmmss
        const itemId = `${itemName}${formattedDatetime}`;
        const newItem = new Item({
            userId, itemId, itemName, category, price, quantity,
        });
        const savedItem = await newItem.save();
        res.status(200).json({ message: 'Add item successful', savedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

async function updateItemQty(req, res) {
    try {
        const { itemId, quantity,
        } = req.body;

        const updateItem = await Item.findOneAndUpdate({ itemId: itemId },
            { $set: { quantity } },
            { new: true });
        res.status(200).json({ message: 'Update item successful', updateItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

async function searchItem(req, res) {
    try {
        const { itemName,
        } = req.body;

        const searchitem = await Item.find({ itemName: itemName });

        if (!searchitem||searchitem.length==0){
            es.status(404).json({ message: 'No item found'});
        }
        if(searchitem){
            res.status(200).json({ message: 'Search item successful', searchitem });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

async function getAllItems(req, res) {
    try {
        const item = await Item.find();
        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

module.exports = {
    addItem,
    updateItemQty,
    searchItem,
    getAllItems,
};