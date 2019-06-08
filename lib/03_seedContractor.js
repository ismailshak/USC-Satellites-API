const mongoose = require('./connection')

const Contractor = require('./models/Contractor')
const Satellite = require('./models/Satellite')
const Country = require('./models/Country')


Country.find({}).then(countries => {
    populateContractorsInCountry(countries)
}).then(_ => {
    Satellite.find({}).then(satellites => {
        satellites.forEach(satellite => {
            Country.findOne({name: satellite.countryName}).then(country => {
                satellite.country.push(country._id)
                satellite.save().then(_ => {
                    Contractor.findOne({name: satellite.contractorName}).then(contractor => {
                        satellite.contractor = contractor._id
                        satellite.save()
                    })
                })
            })
        })
    }).then(_=> {
        Satellite.updateMany({}, {$unset: {countryName: 1, contractorName: 1}}, {new: true})
            .then(res => console.log(res))
    })
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