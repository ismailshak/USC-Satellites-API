const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const parser = require('body-parser')

const satelliteRouter = require('./routes/satellite.js')
const countryRouter = require('./routes/country.js')
const contractorRouter = require('./routes/contractor.js')

// Create an app that is a Feathers AND Express application
const app = express(feathers());

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use('/api/satellite', satelliteRouter)
app.use('/api/country', countryRouter)
app.use('/api/contractor', contractorRouter)

const server = app.listen(3030);

server.on('listening', () => console.log('Feathers application started'));