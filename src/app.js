import express from 'express'
import path from 'path';
import { fileURLToPath } from 'node:url';
import hbs from  'hbs'

import * as f from './utils/forecast.js'
import * as g from './utils/geocode.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname)
const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialDirPath = path.join(__dirname, '../templates/partials')

const port = process.env.PORT || 3000
const app = express()

app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialDirPath)
app.use(express.static(publicDirPath))
app.get('', (req, res)=>{
    res.render('index', {
        title:'Weather App',
        name: "Daman"
    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        res.send({
            error: 'Please Provide an address'
        })
        return
    }

    var city = req.query.address
    g.geoCode(city, (error, data = {})=>{
    if(error) return console.log(error)
    f.forecast(data.location, (error, data2 = {}) => {
        if(error){
            res.send({
                error:'there has been an error'
            })
            return
        }
        console.log("Temperature in " + data.location +": "+ data2.temperature+data2.units)
        res.send({
            place: city,
            temp: data2.temperature,
            unit: data2.units
        })
        
    })    
})


    // res.send({
    //     title: 'forecast',
    //     forecast: 'its cloudy',
    //     location: req.query.address
    // })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Daman'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Daman'
    })
})

app.listen(port, ()=>{
    console.log('server is up on port '+ port)
})