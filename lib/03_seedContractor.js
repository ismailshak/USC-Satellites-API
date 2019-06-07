const mongoose = require('./connection')

const Contractor = require('./models/Contractor')
const Satellite = require('./models/Satellite')
const Country = require('./models/Country')


Country.find({}).then(countries => {
    populateContractorsInCountry(countries)
})


function populateContractorsInCountry(countryList) {
    countryList.forEach(country => {
        let listOfContractors = []
        Contractor.find({country: country._id}).then((contractorList) => {
            contractorList.forEach(contractor => {
                listOfContractors.push(contractor._id)
            })
            Country.findOneAndUpdate({name: country.name}, {contractors: listOfContractors, numberOfContractors: listOfContractors.length}, {new: true})
                .then()
        })
    })
}