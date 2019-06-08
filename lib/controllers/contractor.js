const Contractor = require('../models/Contractor')
const Country = require('../models/Country')

module.exports = {
    index: (req, res) => {
        Contractor.find({}).populate('country').then(contractors => res.json(contractors))//.populate("country")
    },
    findByName: (req, res) => {
        Contractor.findOne({name: req.params.name}).populate('satellites', 'name')
            .populate('country', 'name').then( contractor => res.json(contractor))
    },
    findById: (req, res) => {
        Contractor.findById(req.params.id).populate('satellites', 'name')
        .populate('country', 'name').then(contractor => res.json(contractor))
    },
    findByCountry: (req, res) => {
        Country.findOne({name: req.params.country}).then(country => {
            Contractor.find({country: country._id}).populate('satellites', 'name')
            .populate('country', 'name').then(contractor => res.json(contractor))
        })
    },
    create: (req, res) => {
        Contractor.create(req.body).then(contractor => res.json(contractor))
    },
    edit: (req, res) => {
        Contractor.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updatedContractor => res.json(updatedContractor))
    },
    delete: (req, res) => {
        Contractor.findByIdAndDelete(req.params.id)
            .then(deletedContractor => res.json(deletedContractor))
    }
}