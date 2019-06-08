const data = require('../srcData/sourceData.json');
const fs = require('fs');

// Parse through each object in the data array and extract relevant properties for a satellite
let satArray = data.map(object => {
    let sat = {
        name: object.name,
        UNRegistry: object['UN-Registry'],
        countryName: object.country,
        operator: object.operator,
        user: object.user,
        purpose: object.purpose,
        detailedPurpose: object['detailed-purpose'],
        classOfOrbit: object['class-of-orbit'],
        typeOfOrbit: object['type-of-object'],
        longitudeOfGeo: object['longitude-of-geo'],
        perigree: object.perigree,
        apogee: object.perigree,
        eccentricity: object.eccentricity,
        inclination: object.inclination,
        period: object.period,
        launchMass: object['launch-mass'],
        //dryMass: object['dry-mass'],
        power: object.power,
        dateOfLaunch: object['date-of-launch'],
        expectedLifetime: object['expected-lifetime'],
        contractorName: object.contractor,
        countryOfContractor: object['country-of-contractor'],
        launchSite: object['launch-site'],
        launchVehicle: object['launch-vehicle'],
        cosparNumber: object['cospar-number'],
        noradNumber: object['norad-number'],
        comments: object.comments,
        sources: [object.source, object.source__1, object.source__2, object.source__3, object.source__4, object.source__5]
    }
    return sat
})

// Parse through and extract data relevant to the country
let countryArray = data.map(object => {
    let country = {
        name: object.country,
        satellites: [],
        numberOfSatellites: 0,
        numberOfContractors: 0,
        contractors: []
    }
    return country;
})

// Filter out duplicate entries
let seenNames = {};
countryArray = countryArray.filter(currentObject => {
    if (currentObject.name in seenNames) {
        return false;
    } else {
        seenNames[currentObject.name] = true;
        return true;
    }
});

// Parse through and extract data relevant to the user
let contractorArray = data.map(object => {
    let contractor = {
        name: object.contractor,
        country: object["country-of-contractor"],
        satellites: []
    }
    return contractor;
})

// Filter out duplicate entries
let seenNamesContractor = {};
contractorArray = contractorArray.filter(currentObject => {
    if (currentObject.name in seenNamesContractor) {
        return false;
    } else {
        seenNamesContractor[currentObject.name] = true;
        return true;
    }
});

fs.writeFile('./data/satelliteData.json', JSON.stringify(satArray, null, 2), (err) => {
    if(err) throw err;
    console.log("Satellite data updated")
})

fs.writeFile('./data/countryData.json', JSON.stringify(countryArray, null, 2), (err) => {
    if(err) throw err;
    console.log("Country data updated")
})

fs.writeFile('./data/contractorData.json', JSON.stringify(contractorArray, null, 2), (err) => {
    if(err) throw err;
    console.log("Contractor data updated")
})