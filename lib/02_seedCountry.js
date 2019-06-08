const mongoose = require('./connection')

const Country = require('./models/Country')
const Satellite = require('./models/Satellite')
const Contractor = require('./models/Contractor')

const countryData = require('../data/countryData.json')
const contractorData = require('../data/contractorData.json')

const contractorSeed = contractorData.map(contractor => {
    return {
        name: contractor.name
    }
}) 

Country.deleteMany({}).then(_ => {
    Contractor.deleteMany({}).then(_ => {
        Country.create(countryData).then((countries) => {
            Contractor.create(contractorSeed).then((contractors) => {
                populateSatellitesInCountry(countries)
                    .then(_ => {
                        populateSatellitesInContractors(contractors)
                    })
                    .then(_ => {
                        populateCountryInContractors(contractors)
                    }).then(_ => console.log("done"))
            })
        })
    })
})


async function populateSatellitesInCountry(countryList) {
    
    for(let i = 0; i < countryList.length; i++) {
        // countryList[i].name
        Satellite.find({countryName: countryList[i].name}).then(satellitesWithThisCountry => {
            let listOfSatellites = []
            for(let j = 0; j < satellitesWithThisCountry.length; j++) {

                listOfSatellites.push(satellitesWithThisCountry[j]._id)
            }

            countryList[i].satellites.push.apply(countryList[i].satellites, listOfSatellites)
            countryList[i].numberOfSatellites = listOfSatellites.length
            countryList[i].save()
        })
    }
}

function populateSatellitesInContractors(contractorList) {
    for(let i = 0; i < contractorList.length; i++) {

        Satellite.find({"contractorName": contractorList[i].name}).then(satellitesWithThisContractor => {
            let listOfSatellites = []
            for(let j = 0; j < satellitesWithThisContractor.length; j++) {

                listOfSatellites.push(satellitesWithThisContractor[j]._id)
            }

            contractorList[i].satellites.push.apply(contractorList[i].satellites, listOfSatellites)
            contractorList[i].numberOfSatellites = listOfSatellites.length
            contractorList[i].save()
        })
    }
}

function populateCountryInContractors(contractorList) {
    contractorList.forEach(contractor => {
        let contractorJson = contractorData.find((contractorIterator) => {
            return contractor.name === contractorIterator.name
        })
        Country.findOne({name: contractorJson.country}).then((country) => {
            if(country != null) {
                Contractor.findOneAndUpdate({name: contractor.name}, {country: country._id}, {new: true}).then()
            }
        })
    })
}