const mongoose = require('./connection')

const Satellite = require('./models/Satellite')


const satelliteData = require('../data/satelliteData.json')



// Clean database and seed with new data

Satellite.deleteMany({}).then(() => {
    Satellite.create(satelliteData).then(() => {
    })
})



function populateSatelliteInContractor(contractorList) {
    for(let i = 0; i < contractorList.length; i++) {

        Satellite.find({"contractor": contractorList[i].name}).then(satellitesWithThisContractor => {
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


function populateContractorInCountry(countryList) {

    for(let i = 0; i < countryList.length; i++) {
        Satellite.find({countryOfContractor: countryList[i].name})
            .then(satellitesWithThisContractorCountry => {
                let seenContractors = {}
                // removes duplicates
                let filteredArr = satellitesWithThisContractorCountry.filter(item => {
                    if(item.contractor in seenContractors) {
                        return false;
                    } else {
                        seenContractors[item.contractor] = true;
                        return true
                    }
                })
                return filteredArr;      
            }).then((filteredArr) => {
                for(let j = 0; j < filteredArr.length; j++) {
                    Contractor.findOne({name: filteredArr[j].contractor}).then(contractors => {
                        countryList[i].contractors.push(contractors._id)
                    })
                }
            })//.then(() => countryLis.save())
            //saveList(countryList).then(console.log("Should be saved")).catch(err => console.log(err))
    }    
    //countryList.save()
}

async function saveList(listA) {
    await listA.save()
}

function populateCountryInContractor(contractorList) {
    contractorList.forEach(contractor => {
        let contractorJson = contractorData.find((contractorIterator) => {
            return contractor.name === contractorIterator.name
        })
        Country.find({name: contractorJson.country}).then((country) => {
            contractor.country = country._id;
            
        }).then(() => contractor.save())
    })
}

function populateCountryInSatellite(satelliteList, countryList) {

}

function populateContractorInSatellite(satelliteList, contractorList) {

}


