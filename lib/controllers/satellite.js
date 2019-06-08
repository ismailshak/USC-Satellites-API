const Satellite = require('../models/Satellite')

module.exports = {
    index: (req, res) => {
        console.log("made it")
        Satellite.find({}).then(satellites => res.json(satellites))
    },
    findByName: (req, res) => {

    },
    findById: (req, res) => {

    },
    findByCountry: (req, res) => {

    },
    create: (req, res) => {

    },
    edit: (req, res) => {

    },
    delete: (req, res) => {

    }
}