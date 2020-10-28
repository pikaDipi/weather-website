const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { send } = require('process')
const request =  require('request')
const forecast = require('./utils/forecast.js')
const geocode =  require('./utils/geocode.js')


const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Dipika kantura'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Dipika kantura'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help ',
        name: 'This is help page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You have to provide an address.'
        })
    }

    geocode(req.query.address , (error, {latitude, longitude, location } = {} ) => {
        if(error){
            return res.send({ error })
        }
    forecast(latitude, longitude , (error, forecastData) => {
        if(error){
            return res.send({error})
        }

        res.send({
            forecast: forecastData,
            location,
            address : req.query.address  
        })
    })
    })
        
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a  search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dipika',
        errorMessage: 'Help article not found!.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dipika',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})