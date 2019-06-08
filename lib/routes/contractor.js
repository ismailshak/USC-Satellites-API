const express = require('@feathersjs/express')
const router = express.Router()

const contractorController = require('../controllers/contractor')

router.get('/', contractorController.index)
router.get('/name/:name/', contractorController.findByName)
router.get('/id/:id', contractorController.findById)
router.get('/country/:country', satelliteController.findByCountry)
router.post('/', contractorController.create)
router.put('/', contractorController.edit)
router.delete('/id/:id/', contractorController.delete)

module.exports = router;