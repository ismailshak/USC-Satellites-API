const mongoose = require('../connection')
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const satelliteSchema = new Schema({
    name: {type: String, required: true},
    UNRegistry: String,
    country: String,//[{type: ObjectId, href: "Country", required: true}],
    operator: String,
    user: String,
    purpose: String,
    detailedPurpose: String,
    classOfOrbit: String,
    typeOfOrbit: String,
    longitudeOfGeo: Number,
    perigree: Number,
    apogee: Number,
    eccentricity: Number,
    inclination: Number,
    period: Number,
    launchMass: Number,
    //dryMass: Number,
    power: Number,
    dateOfLaunch: String,
    expectedLifetime: Number,
    contractor: String,//{type: ObjectId, href: "Contractor", required: true},
    countryOfContractor: String,//{type: ObjectId, href: "Country", required: true},
    launchSite: String,
    launchVehicle: String,
    cosparNumber: String,
    noradNumber: Number,
    comments: String,
    sources: [String] 
})

module.exports = mongoose.model("Satellite", satelliteSchema)