const Unit = require('../model/unit_model');
const CropType = require('../model/croptype_model');
const News = require('../model/news_model');

async function addUnit(req, res) {
    try {
        const {
            unitName,
        } = req.body;
        const unit = await Unit.find();
        var unitId = 0;
        if (unit.length != 0) {
            unitId = unit[unit.length - 1].unitId + 1;
        }
        const newUnit = new Unit({
            unitId, unitName,
        });
        const savedItem = await newUnit.save();
        res.status(200).json({ message: 'Add unit successful', savedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
        });
    }
}

async function getUnit(req, res) {
    try {
        const unit = await Unit.find();
        res.status(200).json({ data: unit });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
        });
    }
}

async function addCropType(req, res) {
    try {
        const {
            typeName, duration, harga
        } = req.body;
        const croptype = await CropType.find();
        let typeId = 0;
        if (croptype.length !== 0) {
            typeId = croptype[croptype.length - 1].typeId + 1;
        }
        const newCropType = new CropType({
            typeId,
            typeName,
            duration,
            harga: harga || []
        });
        const savedItem = await newCropType.save();
        res.status(200).json({ message: 'Add crop type successful', savedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
        });
    }
}

async function addPriceToCropType(req, res) {
    try {
        const { typeId, year, price } = req.body;
        const crop = await CropType.findOne({ typeId: typeId });
        if (!crop) {
            return res.status(404).json({ error: 'CropType not found' });
        }
        const yearData = crop.harga.find(h => h.tahun === year);
        if (yearData) {
            yearData.harga_minggu.push(price);
        } else {
            crop.harga.push({
                tahun: year,
                harga_minggu: [price]
            });
        }
        const savedCrop = await crop.save();
        res.status(200).json({ message: 'Price added successfully', savedCrop });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
        });
    }
}

async function getCropType(req, res) {
    try {
        const croptype = await CropType.find();
        res.status(200).json({ data: croptype });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
        });
    }
}

async function getNews(req, res) {
    try {
        const news = await News.find();
        res.status(200).json({ data: news });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
        });
    }
}

module.exports = {
    addUnit,
    getUnit,
    addCropType,
    addPriceToCropType,
    getCropType,
    getNews,
};