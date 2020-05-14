
// Set up variables
const path = require('path')
const express = require('express')
const request = require('request')
const app = express()
const pubdir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const hbs = require('hbs')
const partialsPath = path.join(__dirname, '../templates/partials')
const geocode = require('/Users/charlesdeshazer/Dropbox/Programming/Javascript/Node.js/web-server/utils/geocode.js')
const forecast = require('/Users/charlesdeshazer/Dropbox/Programming/Javascript/Node.js/web-server/utils/forecast.js')
const port = process.env.PORT || 3000
// const chalk = require('chalk')

//Set up handlebars engine, views location and directory for express to use
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(pubdir))

//Set up dynamic content
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Charles DeShazer'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address to find the weather report for"
        })
    }
    geocode(req.query.address, (error, {lat, long, loc} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(lat, long, (error, forecastData)=> {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: loc,
                address: req.query.address
            })
        })
    
    })
})

app.get('/products', (req, res) => {
    
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    
    console.log(req.query.search)
    
    res.send({
        products: [],
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Charles DeShazer'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Charles DeShazer'
    })
})

app.get('/help/*', (req, res) => {
    res.render('errorhelp', {
        title: 'Help 404 Error',
        name: 'Charles DeShazer'
    })
})


app.get('*', (req, res) => {
    res.render('errorgen', {
        title: '404 Error',
        name: 'Charles DeShazer'
    })
})

//starts server and listens on the port
app.listen(port, ( )=> {
    console.log('Server is up on port' + port)
}) 


