const Satellite = require('../models/Satellite')
const Country = require('../models/Country')

module.exports = {
    /**
     * @api {get} /api/satellites/ Request all Satellites
     * @apiName GetSatellites
     * @apiGroup Satellite
     */
    index: (req, res) => {
        Satellite.find({}).populate('country', 'name')
            .populate('contractor', 'name')
            .then(satellites => res.render('satellite.hbs', {array: satellites,multiple: true}))
    },

    /**
     * @api {get} /api/satellites/name/:name Request Satellite by Name
     * @apiName GetByName
     * @apiGroup Satellite
     * 
     * @apiParam {String} name Satellite's name
     */
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

    /**
     * @api {get} /api/satellites/id/:id Request Satellite by id
     * @apiName GetById
     * @apiGroup Satellite
     * 
     * @apiParam {String} id Satellite's id in the database
     */
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

    /**
     * @api {get} /api/satellites/country/:country Request all Satellites by Country name
     * @apiName GetAllByCountryName
     * @apiGroup Satellite
     * 
     * @apiParam {String} country A Satellite's Country
     */
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

    /**
     * @api {post} /api/satellites/ Create a new Satellite
     * @apiName CreateSatellite
     * @apiGroup Satellite
     * 
     * @apiDescription These are all optional fields to include in the request body. Only NAME is required
     * @apiParam (Request body (JSON)) {String} name Name of the Satellite
     * @apiParam (Request body (JSON)) {[Object]} country Array of Country ids
     * @apiParam (Request body (JSON)) {String} operator Satellite's operator
     * @apiParam (Request body (JSON)) {String} user Satellite's user
     * @apiParam (Request body (JSON)) {String} purpose Satellite's purpose - in short
     * @apiParam (Request body (JSON)) {String} detailedPurpose Satellite's detailed purpose
     * @apiParam (Request body (JSON)) {Number} longitudeOfGeo Satellite's geosynchronous equatorial orbit longitude
     * @apiParam (Request body (JSON)) {Number} eccentricity Satellite's eccentricity
     * @apiParam (Request body (JSON)) {Number} inclination Satellite's inclination
     * @apiParam (Request body (JSON)) {Number} period Satellite's period
     * @apiParam (Request body (JSON)) {Number} launchMass Satellite's mass at launch
     * @apiParam (Request body (JSON)) {Number} power Satellite's power
     * @apiParam (Request body (JSON)) {String} dateOfLaunch Satellite's launch date
     * @apiParam (Request body (JSON)) {Number} expectedLifetime Satellite's expected lifetime
     * @apiParam (Request body (JSON)) {Object} contractor Satellite's contractor
     * @apiParam (Request body (JSON)) {String} launchSite Satellite's launch site
     * @apiParam (Request body (JSON)) {String} launchVehicle Satellite's launch vehicle
     * @apiParam (Request body (JSON)) {String} cosparNumber Satellite's cospar number
     * @apiParam (Request body (JSON)) {Number} noradNumber Satellite's norad number
     * @apiParam (Request body (JSON)) {String} comments Any comments about this Satellite
     */
    create: (req, res) => {
        Satellite.create(req.body).then(satellite => res.json(satellite))
    },

    /**
     * @api {put} /api/satellites/id/:id Edit an existing Satellite
     * @apiName EditSatellite
     * @apiGroup Satellite
     * 
     * @apiParam {String} id Satellite's id
     * 
     * @apiParam (Request body (JSON)) {String} name Name of the Satellite
     * @apiParam (Request body (JSON)) {[Object]} country Array of Country ids
     * @apiParam (Request body (JSON)) {String} operator Satellite's operator
     * @apiParam (Request body (JSON)) {String} user Satellite's user
     * @apiParam (Request body (JSON)) {String} purpose Satellite's purpose - in short
     * @apiParam (Request body (JSON)) {String} detailedPurpose Satellite's detailed purpose
     * @apiParam (Request body (JSON)) {Number} longitudeOfGeo Satellite's geosynchronous equatorial orbit longitude
     * @apiParam (Request body (JSON)) {Number} eccentricity Satellite's eccentricity
     * @apiParam (Request body (JSON)) {Number} inclination Satellite's inclination
     * @apiParam (Request body (JSON)) {Number} period Satellite's period
     * @apiParam (Request body (JSON)) {Number} launchMass Satellite's mass at launch
     * @apiParam (Request body (JSON)) {Number} power Satellite's power
     * @apiParam (Request body (JSON)) {String} dateOfLaunch Satellite's launch date
     * @apiParam (Request body (JSON)) {Number} expectedLifetime Satellite's expected lifetime
     * @apiParam (Request body (JSON)) {Object} contractor Satellite's contractor
     * @apiParam (Request body (JSON)) {String} launchSite Satellite's launch site
     * @apiParam (Request body (JSON)) {String} launchVehicle Satellite's launch vehicle
     * @apiParam (Request body (JSON)) {String} cosparNumber Satellite's cospar number
     * @apiParam (Request body (JSON)) {Number} noradNumber Satellite's norad number
     * @apiParam (Request body (JSON)) {String} comments Any comments about this Satellite
     */
    edit: (req, res) => {
        Satellite.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updatedSatellite => res.json(updatedSatellite))
    },

    /**
     * @api {delete} /api/satellites/id/:id Delete an existing Satellite
     * @apiName DeleteSatellite
     * @apiGroup Satellite
     * 
     * @apiParam {String} id Satellite's id
     */
    delete: (req, res) => {
        Satellite.findByIdAndDelete(req.params.id)
            .then(deletedSatellite => res.json(deletedSatellite))
    }
}