const Item = require('../model/item_model');

async function addItem(req, res) {
    try {
        const {
            userId, itemName, category, pricePerQuantity, pricePerUnit, quantity, quantityUnit, harvestDate, itemImage,
        } = req.body;
        const item = await Item.find();
        var itemId = 0;
        if (item.length !== 0) {
            itemId = item[item.length - 1].itemId + 1;
        }
        const newItem = new Item({
            userId, itemId, itemName, category, pricePerQuantity, pricePerUnit, quantity, quantityUnit, harvestDate, itemImage,
        });
        const savedItem = await newItem.save();
        res.status(200).json({ message: 'Add item successful', savedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
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
            error: error
        });
    }
}

async function searchItem(req, res) {
    try {
        const { itemName,
        } = req.body;

        const searchitem = await Item.find({ category: itemName });

        if (!searchitem || searchitem.length == 0) {
            res.status(404).json({ message: 'No item found' });
        }
        if (searchitem) {
            res.json(searchitem);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
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
            error: error
        });
    }
}

async function getItemsByUser(req, res) {
    try {
        const { userId
        } = req.body;
        const item = await Item.find({ userId: userId });
        
        if (!item || item.length == 0) {
            res.status(404).json({ message: 'No item found' });
        }
        if (item) {
            res.status(200).json({ data: item });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
        });
    }
}

module.exports = {
    addItem,
    updateItemQty,
    searchItem,
    getAllItems,
    getItemsByUser,
};
