const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const parser = require('body-parser')

const satelliteController = require('./controllers/satellite.js')
const countryController = require('./controllers/country.js')
const contractorController = require('./controllers/contractor.js')

// Create an app that is a Feathers AND Express application
const app = express(feathers());

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use('/api/satellite', satelliteController)
app.use('/api/country', countryController)
app.use('/api/contractor', contractorController)

const server = app.listen(3030);

server.on('listening', () => console.log('Feathers application started'));