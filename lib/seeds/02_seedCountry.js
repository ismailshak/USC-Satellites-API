const mongoose = require('../connection')

// Country, satellite, contractor schemas
const Country = require('../models/Country')
const Satellite = require('../models/Satellite')
const Contractor = require('../models/Contractor')

// Country and contractor parsed data
const countryData = require('../../data/countryData.json')
const contractorData = require('../../data/contractorData.json')

// Only hold contractors name from the parsed data
// I'll be using the parsed data (contractorData.json) to link country and contractor together
// I use this collection to initially seed my database
const contractorSeed = contractorData.map(contractor => {
    return {
        name: contractor.name
    }
}) 

// Clean database and seed with new data
Country.deleteMany({}).then(_ => {
    Contractor.deleteMany({}).then(_ => {
        Country.create(countryData).then((countries) => {
            Contractor.create(contractorSeed).then((contractors) => {
                // Passing in the entire newly created Country collection
                populateSatellitesInCountry(countries)
                    .then(_ => {
                        // Passing in the entire newly created Contractors collection
                        populateSatellitesInContractors(contractors)
                    })
                    .then(_ => {
                        // Passing in the entire newly created Contractors collection
                        populateCountryInContractors(contractors)
                    })
                    .then(_ => console.log("done"))
            })
        })
    })
})

// Fill the satellites array in each Country document
// with satellite ids.
// It's an async function, which allows me to chain a .then() promise after it
async function populateSatellitesInCountry(countryList) {
    
    // Loop through the collection
    for(let i = 0; i < countryList.length; i++) {
        // For each document, find all satellites that have this country listed as it's property
        Satellite.find({countryName: countryList[i].name}).then(satellitesWithThisCountry => {
            // Temporary array to hold full list of satellites
            // To avoid pushing into a document multiple times
            let listOfSatellites = []
            for(let j = 0; j < satellitesWithThisCountry.length; j++) {
                
                // Push into temp array
                listOfSatellites.push(satellitesWithThisCountry[j]._id)
            }
            // Push all elements from temp array to satellites property in Country,
            // update the satellite count property and save these change
            countryList[i].satellites.push.apply(countryList[i].satellites, listOfSatellites)
            countryList[i].numberOfSatellites = listOfSatellites.length
            countryList[i].save()
        })
    }
}

// Fill the satellites array in each Contractor document
// with satellite ids
function populateSatellitesInContractors(contractorList) {
    
    // Loop through the collection
    for(let i = 0; i < contractorList.length; i++) {
        // For each document, find all satellites that have this contractor listed as it's property
        Satellite.find({"contractorName": contractorList[i].name}).then(satellitesWithThisContractor => {
            // Temporary array to hold full list of satellites
            // To avoid pushing into a document multiple times
            let listOfSatellites = []
            for(let j = 0; j < satellitesWithThisContractor.length; j++) {
                // Push into temp array
                listOfSatellites.push(satellitesWithThisContractor[j]._id)
            }
            // Push all elements from temp array to satellites property in Contractor,
            // update the satellite count property and save these change
            contractorList[i].satellites.push.apply(contractorList[i].satellites, listOfSatellites)
            contractorList[i].numberOfSatellites = listOfSatellites.length
            contractorList[i].save()
        })
    }
}

// Link a Country to the Contractor model
function populateCountryInContractors(contractorList) {
    // Loop through the collection
    contractorList.forEach(contractor => {
        // Find the Contractor in the original data file 
        // (the file that holds the country property as a string, for reference)
        // with the same name as this document
        let contractorJson = contractorData.find((contractorIterator) => {
            return contractor.name === contractorIterator.name
        })
        // Find the document in Country that matches the country in Contractor
        Country.findOne({name: contractorJson.country}).then((country) => {
            // If the country exists in the Country model
            if(country != null) {
                // Update the Contractor document by giving it this Country's object id
                Contractor.findOneAndUpdate({name: contractor.name}, {country: country._id}, {new: true}).then()
            }
        })
    })
}