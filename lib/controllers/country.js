const Country = require('../models/Country')

module.exports = {
    /**
     * @api {get} /api/satellites/ [Show all Satellites]
     * @apiName GetSatellites
     * @apiGroup Satellite
     */
    index: (req, res) => {
        Country.find({}).populate('satellites', 'name')
            .populate('contractors', 'name').then(countries => res.render("country.hbs",{array: countries,multiple:true}))
    },
    /**
     * @api {get} /api/satellites/name/:name
     * @apiName GetSatelliteByName
     * @apiGroup Satellite
     * 
     * @apiParam {String} name Satellite's name
     */
    findByName: (req, res) => {
        Country.findOne({name: req.params.name}).populate('satellites', 'name')
        .populate('contractors', 'name').then(country => {
            if(country != null) {
                res.render("country.hbs", {name: country, multiple:false})
            }
            else {
                res.render("error.hbs", {message: "Couldn't find entry you were looking for, double check your input"})
            }
            
        })
        
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
        .populate('contractors', 'name').then(country => {
            if(country != null) {
                res.render("country.hbs", {name: country, multiple:false})
            }
            else {
                res.render("error.hbs", {message: "Couldn't find entry you were looking for, double check your input"})
            }
            
        })
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