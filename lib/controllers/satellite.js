const Satellite = require('../models/Satellite')
const Country = require('../models/Country')

module.exports = {
    index: (req, res) => {
        Satellite.find({}).populate('country', 'name')
            .populate('contractor', 'name')
            .then(satellites => res.render('satellite.hbs', {array: satellites,multiple: true}))
    },
    findByName: (req, res) => {
        Satellite.findOne({name: req.params.name}).populate('country', 'name')
        .populate('contractor', 'name').then(satellite => {
            if(satellite != null) {
                res.render("satellite.hbs", {name: satellite, multiple:false, innerMultiple: false})
            }
            else {
                res.render("error.hbs", {message: "Couldn't find entry you were looking for, double check your input"})
            }
            
        })
    },
    findById: (req, res) => {
        Satellite.findById(req.params.id).populate('country', 'name')
        .populate('contractor', 'name').then(satellite => {
            if(satellite != null) {
                res.render("satellite.hbs", {name: satellite, multiple:false, innerMultiple: false})
            }
            else {
                res.render("error.hbs", {message: "Couldn't find entry you were looking for, double check your input"})
            }
            
        })
    },
    findByCountry: (req, res) => {
        Country.findOne({name: req.params.country}).then(country => {
            Satellite.find({country: country._id}).populate('country', 'name')
            .populate('contractor', 'name').then(satellite => {
                if(satellite != null) {
                    res.render("satellite.hbs", {name: satellite, multiple:false, innerMultiple: true, array: satellite})
                }
                else {
                    res.render("error.hbs", {message: "Couldn't find entry you were looking for, double check your input"})
                }
                
            })
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