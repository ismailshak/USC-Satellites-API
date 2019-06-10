const Country = require('../models/Country')

module.exports = {
    /**
     * @api {get} /api/countries/ Request all Countries
     * @apiName GetCountries
     * @apiGroup Country
     */
    index: (req, res) => {
        Country.find({}).populate('satellites', 'name')
            .populate('contractors', 'name').then(countries => res.render("country.hbs",{array: countries,multiple:true}))
    },
    /**
     * @api {get} /api/countries/name/:name Request Country by Name
     * @apiName GetByName
     * @apiGroup Country
     * 
     * @apiParam {String} name Country's name
     */
    findByName: (req, res) => {
        Country.findOne({name: req.params.name}).populate('satellites', 'name')
        .populate('contractors', 'name')
        .then(country => {
            if(country != null) {
                res.render("country.hbs", {name: country, multiple:false})
            }
            else {
                res.render("error.hbs", {message: "Couldn't find entry you were looking for, double check your input"})
            }
            
        })
        
    },
    /**
     * @api {get} /api/countries/id/:id Request Country by id
     * @apiName GetById
     * @apiGroup Country
     * 
     * @apiParam {String} id Country's id in the database
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

    /**
     * @api {post} /api/countries/ Create a new Country
     * @apiName CreateCountry
     * @apiGroup Country
     * 
     * @apiDescription These are all optional fields to include in the request body. Only NAME is required
     * @apiParam (Request body (JSON)) {String} name Name of the Country
     * @apiParam (Request body (JSON)) {[Object]} satellites Array of Satellites ids
     * @apiParam (Request body (JSON)) {Number} numberOfSatellites Number of Satellites this Country has
     * @apiParam (Request body (JSON)) {Number} numberOfContractors Number of Contractors this Country has
     * @apiParam (Request body (JSON)) {[Object]} contractors Array of Contractors ids
     */
    create: (req, res) => {
        Country.create(req.body).then(createdCountry => res.json(createdCountry))
    },
    /**
     * @api {put} /api/countries/id/:id Edit an existing Country
     * @apiName EditCountry
     * @apiGroup Country
     * 
     * @apiParam {String} id Country's id
     * @apiParam (Request body (JSON)) {String} name Name of the Country
     * @apiParam (Request body (JSON)) {[Object]} satellites Array of Satellites ids
     * @apiParam (Request body (JSON)) {Number} numberOfSatellites Number of Satellites this Country has
     * @apiParam (Request body (JSON)) {Number} numberOfContractors Number of Contractors this Country has
     * @apiParam (Request body (JSON)) {[Object]} contractors Array of Contractors ids
     */
    edit: (req, res) => {
        Country.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updatedCountry => res.json(updatedCountry))
    },

    /**
     * @api {delete} /api/countries/id/:id Delete an existing Country
     * @apiName DeleteCountry
     * @apiGroup Country
     * 
     * @apiParam {String} id Country's id
     */
    delete: (req, res) => {
        Country.findByIdAndDelete(req.params.id).then(deletedCountry => res.json(deletedCountry))
    }
}