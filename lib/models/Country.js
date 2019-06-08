const mongoose = require('../connection')
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const countrySchema = new Schema({
    name: {type: String, required: true},
    satellites: [{type: ObjectId, ref: "Satellite"}],
    numberOfSatellites: Number,
    numberOfContractors: Number,
    contractors: [{type: ObjectId, ref: "Contractor"}]
})

module.exports = mongoose.model("Country", countrySchema)