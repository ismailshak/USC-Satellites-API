const Contractor = require('../models/Contractor')
const Country = require('../models/Country')

module.exports = {
     /**
     * @api {get} /api/contractors/ Request all Contractors
     * @apiName GetContractors
     * @apiGroup Contractor
     */
    index: (req, res) => {
        Contractor.find({}).populate('country').then(contractors => res.render("contractor.hbs", {array: contractors, multiple: true}))//.populate("country")
    },
    /**
     * @api {get} /api/contractors/name/:name Request Contractor by Name
     * @apiName GetByName
     * @apiGroup Contractor
     * 
     * @apiParam {String} name Contractor's name
     */
    findByName: (req, res) => {
        Contractor.findOne({name: req.params.name}).populate('satellites', 'name')
            .populate('country', 'name').then(contractor => {
                if(contractor != null) {
                    res.render("contractor.hbs", {name: contractor, multiple:false})
                }
                else {
                    res.render("error.hbs", {message: "Couldn't find entry you were looking for, double check your input"})
                }
                
            })
    },
    
    /**
     * @api {get} /api/contractors/id/:id Request Contractor by id
     * @apiName GetById
     * @apiGroup Contractor
     * 
     * @apiParam {String} id Contractor's id in the database
     */
    findById: (req, res) => {
        Contractor.findById(req.params.id).populate('satellites', 'name')
        .populate('country', 'name').then(contractor => res.json(contractor))
    },

    /**
     * @api {get} /api/contractors/country/:country Request all Contractors by Country name
     * @apiName GetAllByCountryName
     * @apiGroup Contractor
     * 
     * @apiParam {String} country A Contractor's Country
     */
    findByCountry: (req, res) => {
        Country.findOne({name: req.params.country}).then(country => {
            Contractor.find({country: country._id}).populate('satellites', 'name')
            .populate('country', 'name').then(contractor => {
                if(contractor != null) {
                    res.render("contractor.hbs", {name: contractor, multiple:false, innerMultiple: true, array: contractor})
                }
                else {
                    res.render("error.hbs", {message: "Couldn't find entry you were looking for, double check your input"})
                }
                
            })
        })
    },

    /**
     * @api {post} /api/contractors/ Create a new Contractor
     * @apiName CreateContractor
     * @apiGroup Contractor
     * 
     * @apiDescription These are all optional fields to include in the request body. Only NAME is required
     *
     * @apiParam (Request body (JSON)) {String} name Contractor's name
     * @apiParam (Request body (JSON)) {Object} country Contractor's Country(id) of origin
     * @apiParam (Request body (JSON)) {[Object]} satellites Array of Satellite ids that belong to this Contractor
     */
    create: (req, res) => {
        Contractor.create(req.body).then(contractor => res.json(contractor))
    },

     /**
     * @api {put} /api/contractors/id/:id Edit an existing Contractor
     * @apiName EditContractor
     * @apiGroup Contractor
     * 
     * @apiParam {String} id Contractor's id
     *
     * @apiParam (Request body (JSON)) {String} name Contractor's name
     * @apiParam (Request body (JSON)) {Object} country Contractor's Country(id) of origin
     * @apiParam (Request body (JSON)) {[Object]} satellites Array of Satellite ids that belong to this Contractor
     */
    edit: (req, res) => {
        Contractor.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updatedContractor => res.json(updatedContractor))
    },

    /**
     * @api {delete} /api/contractors/id/:id Delete an existing Contractor
     * @apiName DeleteContractor
     * @apiGroup Contractor
     * 
     * @apiParam {String} id Contractor's id
     */
    delete: (req, res) => {
        Contractor.findByIdAndDelete(req.params.id)
            .then(deletedContractor => res.json(deletedContractor))
    }
}