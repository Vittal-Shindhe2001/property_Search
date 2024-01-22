const express = require("express")
const router = express.Router()
const propertyController = require("../app/controller/property_controller")
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// Routes
router.post('/api/createProperty', upload.single("image"), propertyController.create)
router.get('/api/properties',propertyController.show)
router.get('/api/properties/search', propertyController.searchProperty)
router.get('/api/properties/filterPurchase', propertyController.filterList)
router.get('/api/properties/filterCategory',propertyController.filterCategory)
router.get('/api/properties/sort',propertyController.sortProperty )

module.exports = router