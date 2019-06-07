const mongoose = require('../connection')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const contractorSchema = new Schema({
    name: {type: String, required: true},
    country: {type: ObjectId, href: "Country"},
    satellites: [{type: ObjectId, href: "Satellite"}]
})

module.exports = mongoose.model("Contractor", contractorSchema)