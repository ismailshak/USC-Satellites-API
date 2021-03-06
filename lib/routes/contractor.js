const express = require('express')
const router = express.Router()

// Controller to find specific function implementations
const contractorController = require('../controllers/contractor')

router.get('/', contractorController.index)
router.get('/name/:name/', contractorController.findByName)
router.get('/id/:id', contractorController.findById)
router.get('/country/:country', contractorController.findByCountry)
router.post('', contractorController.create)
router.put('/id/:id/', contractorController.edit)
router.delete('/id/:id/', contractorController.delete)

module.exports = router;