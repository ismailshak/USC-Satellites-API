const express = require('express')
const router = express.Router()

// Controller to find specific function implementations
const countryController = require('../controllers/country')

router.get('/', countryController.index)
router.get('/name/:name/', countryController.findByName)
router.get('/id/:id', countryController.findById)
router.post('/', countryController.create)
router.put('/id/:id/', countryController.edit)
router.delete('/id/:id/', countryController.delete)

module.exports = router;