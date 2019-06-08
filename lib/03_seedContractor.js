const mongoose = require('./connection')

// Contractor, Satellite and Country schemas
const Contractor = require('./models/Contractor')
const Satellite = require('./models/Satellite')
const Country = require('./models/Country')

// Query every country in the collection
Country.find({}).then(countries => {
    // Passing in the entire country collection
    populateContractorsInCountry(countries)
}).then(_ => {
    // Find all satellites
    Satellite.find({}).then(satellites => {
        // For every satellite
        satellites.forEach(satellite => {
            // Find the country that has this satellite
            Country.findOne({name: satellite.countryName}).then(country => {
                // Add and save the country id in the country array in Satellite
                satellite.country.push(country._id)
                satellite.save().then(_ => {
                    // Then find the contractor that has this satellite
                    Contractor.findOne({name: satellite.contractorName}).then(contractor => {
                        // Update the id in the object id property in Satellite
                        satellite.contractor = contractor._id
                        satellite.save()
                    })
                })
            })
        })
    }).then(_=> {
        // Then when successfully linked Country and Contractor to Satellite,
        // remove both placeholder properties in Satellite that helped in linking everything together
        Satellite.updateMany({}, {$unset: {countryName: 1, contractorName: 1}}, {new: true})
            .then(res => console.log(res))
    })
})

// Link a all contractors to the Country model
function populateContractorsInCountry(countryList) {
    // Loop through all the collection
    countryList.forEach(country => {
        // Temporary array to hold all contractors.
        // Avoids pushing multiple times to one document.
        let listOfContractors = []
        // Find all contractors who have this country listed in its country property.
        Contractor.find({country: country._id}).then((contractorList) => {
            // For each contractor in that list produced by the query
            contractorList.forEach(contractor => {
                // Store its id in temp array
                listOfContractors.push(contractor._id)
            })
            // Find that country and update both contractors list and number of contractors
            Country.findOneAndUpdate({name: country.name}, {contractors: listOfContractors, numberOfContractors: listOfContractors.length}, {new: true})
                .then()
        })
    })
}