const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Andrew Mead'
    });
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Page',
        name: 'Bhawana Bisht'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help Page',
        name: 'Bhawana',
        helptext: 'Hello!! How may I help you?'
    })
})
app.get('/weather', (req,res) => { 
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res) => {
    console.log(req.query);
    res.send({
       products: [] 
    })
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Bhawana Bisht',
        errorMessage: 'Help artice not found.'

    })
})
app.get('*',(req,res) =>{
    res.render('404',{
        title: '404',
        name: 'Bhawana Bisht',
        errorMessage: 'Page not exist'

    })
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})