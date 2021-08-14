const express = require('express')
const { response } = require('express');
const path = require('path')
const hbs = require('hbs');

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(partialsPath)

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
 
// Setup static directory to serve
app.use(express.static(publicDirectory))



app.get('', (req, res) => {
  res.render('index', {
    'title': 'Weather',
    'name': 'Rick'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    'title': 'About Me',
    'name': 'Rick'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    'title': 'Help',
    'helpText': 'Here is some help',
    'name': 'Rick'
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    'title': '404',
    'message': 'Help article not found',
    'name': 'Rick'
  })
})
app.get('/weather', (req, res) => {
  if(!req.query.address)
    return res.send({error:  'you must provide an address'})

    geocode(req.query.address, (error, {latitude, longitude, location} = {})  =>  {
      if(error) 
        res.send( {error: error})
  
      forecast(latitude, longitude, (error, forecastData) => {
        if(error) 
          res.send({error: error})
  
        res.send({location, forecast: forecastData, address: req.query.address })
      })
    })
})

app.get('*', (req, res) => {
  res.render('404', {
    'title': '404',
    'message': 'Page not found',
    'name': 'Rick'
  })
})

app.listen(port,  (req, res) => {
  console.log('Server is up on port ' + port)
})