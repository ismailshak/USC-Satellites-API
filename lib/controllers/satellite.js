const Satellite = require('../models/Satellite')
const Country = require('../models/Country')

module.exports = {
    index: (req, res) => {
        Satellite.find({}).populate('country', 'name')
            .populate('contractor', 'name').then(satellites => res.json(satellites))
    },
    findByName: (req, res) => {
        Satellite.findOne({name: req.params.name}).populate('country', 'name')
        .populate('contractor', 'name').then( satellite => res.json(satellite))
    },
    findById: (req, res) => {
        Satellite.findById(req.params.id).populate('country', 'name')
        .populate('contractor', 'name').then(satellite => res.json(satellite))
    },
    findByCountry: (req, res) => {
        Country.findOne({name: req.params.country}).then(country => {
            Satellite.find({country: country._id}).populate('country', 'name')
            .populate('contractor', 'name').then(satellite => res.json(satellite))
        })
    },
    create: (req, res) => {
        Satellite.create(req.body).then(satellite => res.json(satellite))
    },
    edit: (req, res) => {
        Satellite.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updatedSatellite => res.json(updatedSatellite))
    },
    delete: (req, res) => {
        Satellite.findByIdAndDelete(req.params.id)
            .then(deletedSatellite => res.json(deletedSatellite))
    }
}