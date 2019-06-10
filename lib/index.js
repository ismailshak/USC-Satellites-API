const express = require('express');
const parser = require('body-parser')
const hbs = require('express-handlebars')

const satelliteRouter = require('./routes/satellite')
const countryRouter = require('./routes/country')
const contractorRouter = require('./routes/contractor')

// Create an app that Express application
const app = express();


// Setting up an engine to run my handlebars view
app.engine('.hbs', hbs({defaultLayout: 'main', extname: '.hbs'}));

// Use Handlebars view engine
app.set('view engine', '.hbs');

// use the body parser extension
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// Redirect to "home page"
app.get('/', (req, res) => {
  res.render("index.hbs") 
})

// Use the apidoc generated index file when path is /api
app.use('/api', express.static('./apidoc'))

// Use layout/main in view for front end template
app.use(express.static("./views/public"));

// Connect routers for handling models
app.use('/api/satellites', satelliteRouter)
app.use('/api/countries', countryRouter)
app.use('/api/contractors', contractorRouter)

app.set("port", process.env.PORT || 3030);

app.listen(app.get("port"), () => console.log(`PORT: ${app.get("port")}`))
