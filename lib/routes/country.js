const express = require('@feathersjs/express')
const router = express.Router()

const countryController = require('../controllers/country')

router.get('/', countryController.index)
router.get('/name/:name/', countryController.findByName)
router.get('/id/:id', countryController.findById)
router.post('/', countryController.create)
router.put('/', countryController.edit)
router.delete('/id/:id/', countryController.delete)

module.exports = router;