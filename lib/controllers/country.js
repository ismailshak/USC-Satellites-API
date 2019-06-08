const Country = require('../models/Country')

module.exports = {
    index: (req, res) => {
        Country.find({}).populate('satellites', 'name')
            .populate('contractors', 'name').then(countries => res.json(countries))
    },
    findByName: (req, res) => {
        Country.findOne({name: req.params.name}).populate('satellites', 'name')
        .populate('contractors', 'name').then(country => res.json(country))
    },
    findById: (req, res) => {
        Country.findById(req.params.id).populate('satellites', 'name')
        .populate('contractors', 'name').then(country => res.json(country))
    },
    create: (req, res) => {
        Country.create(req.body).then(createdCountry => res.json(createdCountry))
    },
    edit: (req, res) => {
        Country.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updatedCountry => res.json(updatedCountry))
    },
    delete: (req, res) => {
        Country.findByIdAndDelete(req.params.id).then(deletedCountry => res.json(deletedCountry))
    }
}