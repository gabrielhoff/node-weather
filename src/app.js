const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Static directory to serve
app.use(express.static(publicDirPath))

const creatorName = 'Gabriel Hoff'

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather page',
        name: creatorName
    })    
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name: creatorName
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: creatorName,
        message: 'Hello, how can I help you',
    })
})
app.get('/weather', (req, res) => {
    
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if(error)  {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error)  {
                return res.send({error})
            }
            data = {
                forecast: forecastData,
                location,
                address: req.query.address
            }
            res.send(data)
        })
    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search)
        return res.send({
            error: 'You must provide a search term'
        })

    res.send({ products: []})
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: creatorName,
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: creatorName,
        errorMessage: 'Page not found'
    })
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
}) 