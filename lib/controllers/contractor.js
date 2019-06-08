const Contractor = require('../models/Contractor')

module.exports = {
    index: (req, res) => {
        Contractor.find({}).then(satellites => res.json(satellites))
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