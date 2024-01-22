const { body, validationResult } = require('express-validator');
const Property = require('../module/propertyModel');

const propertyController = {}

// express validator
propertyController.create = [
    body('purchaseType').notEmpty().withMessage('purchaseType  is required'),
    body('propertyType').notEmpty().withMessage('Property type is required'),
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                // If there are validation errors, return a response with the errors
                return res.status(400).json({ errors: errors.array() })
            }

            const { body } = req;
            const image = req.file.path;
            const result = await Property.create({ ...body, image: image });
            res.json(result);
        } catch (error) {
            res.json(error);
        }
    }]

propertyController.show = async (req, res) => {
    try {
        const result = await Property.find()
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}
// sort
propertyController.sortProperty = async (req, res) => {
    try {
        const { type } = req.query;
        let sortDirection = 1
        if (type && type.toLowerCase() === 'amount-high to low') {
            sortDirection = -1;
        }
        const sortedProperties = await Property.aggregate([
            { $sort: { amount: sortDirection } }
        ])
        res.json(sortedProperties);
    } catch (error) {
        res.json(error);
    }
}
//search
propertyController.searchProperty = async (req, res) => {
    try {
        const { search } = req.query;
        if (!search) {
            return res.status(400).json({ error: 'Search query is required.' })
        }

        const regexSearch = new RegExp(search, 'i');
        const searchResults = await Property.aggregate([
            {
                $match: {
                    $or: [
                        { location: { $regex: regexSearch } },
                        { project: { $regex: regexSearch } },
                    ],
                },
            },
        ]);

        res.json(searchResults)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}


propertyController.filterList = async (req, res) => {
    try {
        const { purchaseType } = req.query
        const filterData = await Property.aggregate([
            {
                $match: {
                    purchaseType: purchaseType
                }
            }
        ]);

        res.json(filterData)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}

propertyController.filterCategory = async (req, res) => {
    try {
        const { purchaseType, property } = req.query
        const filterData = await Property.aggregate([
            {
                $match: {
                    purchaseType: purchaseType,
                    propertyType: property
                }
            }
        ])
        res.json(filterData)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}
module.exports = propertyController
