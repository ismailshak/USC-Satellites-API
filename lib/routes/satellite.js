const express = require('@feathersjs/express')
const router = express.Router()

const satelliteController = require('../controllers/satellite')

router.get('/', satelliteController.index)
router.get('/name/:name/', satelliteController.findByName)
router.get('/id/:id/', satelliteController.findById)
router.get('/country/:country/', satelliteController.findByCountry)
router.post('/', satelliteController.create)
router.put('/id/:id/', satelliteController.edit)
router.delete('/id/:id/', satelliteController.delete)

module.exports = router;