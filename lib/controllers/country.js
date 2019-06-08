const Country = require('../models/Country')

module.exports = {
    /**
     * @api GET /api/satellites/ [Show all Satellites]
     * @apiName GetSatellites
     * @apiGroup Satellite
     */
    index: (req, res) => {
        Country.find({}).populate('satellites', 'name')
            .populate('contractors', 'name').then(countries => res.json(countries))
    },
    /**
     * @api GET /api/satellites/name/:name
     * @apiName GetSatelliteByName
     * @apiGroup Satellite
     * 
     * @apiParam {String} name Satellite's name
     */
    findByName: (req, res) => {
        Country.findOne({name: req.params.name}).populate('satellites', 'name')
        .populate('contractors', 'name').then(country => res.json(country))
    },
    /**
     * @api GET
     * @apiName GetById
     * @apiGroup Satellite
     * 
     * @apiParam {String} id Satellite's id in the database
     */
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