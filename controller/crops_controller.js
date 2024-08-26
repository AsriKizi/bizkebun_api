const Crops = require('../model/crop_model');

async function addCrop(req, res) {
    try {
        const {
            userId, cropType, cropStatus, unit, quantity, cropDate, harvestDate, negeri, weekNumber,
        } = req.body;
        const crop = await Crops.find();
        var cropId = 0;
        if (crop.length !== 0) {
            cropId = crop[crop.length - 1].cropId + 1;
        }
        const newCrop = new Crops({
            userId, cropId, cropType, cropStatus, unit, quantity, cropDate, harvestDate, negeri, weekNumber,
        });
        const savedItem = await newCrop.save();
        res.status(200).json({ message: 'Add crop successful', savedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
        });
    }
}

async function getAllCrops(req, res) {
    try {
        const crop = await Crops.find();
        res.json(crop);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
        });
    }
}

async function getCropsByUser(req, res) {
    try {
        const { userId
        } = req.body;
        const crop = await Crops.find({ userId: userId }).sort({ cropId: -1 });
        if (!crop || crop.length == 0) {
            return res.status(404).json({ message: 'No crop found' });
        }
        if (crop) {
            res.status(200).json({ data: crop });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
        });
    }
}

async function updateCropStatus(req, res) {
    try {
        const { cropId, cropStatus,
        } = req.body;

        const updateItem = await Crops.findOneAndUpdate({ cropId: cropId },
            { $set: { cropStatus } },
            { new: true });
        res.status(200).json({ message: 'Update crops successful', updateItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
        });
    }
}

async function updateCropHarvest(req, res) {
    try {
        const { cropId, harvestQuantity,
        } = req.body;

        const updateItem = await Crops.findOneAndUpdate({ cropId: cropId },
            { $set: { harvestQuantity } },
            { new: true });
        res.status(200).json({ message: 'Update crops successful', updateItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
        });
    }
}

module.exports = {
    addCrop,
    getAllCrops,
    getCropsByUser,
    updateCropStatus,
    updateCropHarvest,
};