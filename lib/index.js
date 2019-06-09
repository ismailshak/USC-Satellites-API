const express = require('express');
const parser = require('body-parser')
const hbs = require('express-handlebars')

const satelliteRouter = require('./routes/satellite')
const countryRouter = require('./routes/country')
const contractorRouter = require('./routes/contractor')

// Create an app that Express application
const app = express();

// app.set('view engine', 'hbs');

app.engine('.hbs', hbs({defaultLayout: 'main', extname: '.hbs'}));
// Use Handlebars view engine
app.set('view engine', '.hbs');

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.get('/', (req, res) => {
  res.render("index.hbs") 
})

// app.get('/satellites', (req, res) => {
//   res.render("satellite.hbs") 
// })
app.use('/api', express.static(__dirname, '/apidoc'))

app.use(express.static("./views/public"));

app.use('/api/satellites', satelliteRouter)
app.use('/api/countries', countryRouter)
app.use('/api/contractors', contractorRouter)

// app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.set("port", process.env.PORT || 3030);

app.listen(app.get("port"), () => console.log(`PORT: ${app.get("port")}`))
