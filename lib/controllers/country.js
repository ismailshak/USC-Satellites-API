const Country = require('../models/Country')

module.exports = {
    index: (req, res) => {
        Country.find({}).then(satellites => res.json(satellites))
    },
    findByName: (req, res) => {

    },
    findById: (req, res) => {

    },
    create: (req, res) => {

    },
    edit: (req, res) => {

    },
    delete: (req, res) => {

    }
}