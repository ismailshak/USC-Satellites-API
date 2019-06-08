const mongoose = require('./connection')

// Satellite schema and parsed data
const Satellite = require('./models/Satellite')
const satelliteData = require('../data/satelliteData.json')

// Clean database and seed with new data
Satellite.deleteMany({}).then(() => {
    Satellite.create(satelliteData).then(() => {
    })
})
