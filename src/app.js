const path = require('path')
const express = require('express')
const hbs = require('hbs')

// importing local js files
const geoCode = require('./utils/geocode')
const forecast = require('./utils/weather')

const app = express()

// Define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get("", (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Rohit Singh"
    })
})

app.get("/about", (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Rohit Singh"
    })
})

app.get("/help", (req, res) => {
    res.render('help', {
        title: "Help Topics",
        name: "Rohit Singh",
        helpText: "This is a dummy help text. "
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: "404",
        errorText: "Help article not found!!!",
        name: "Rohit Singh"
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address;
    if (!address) {
        return res.send({ error: "Please provide an address to search ..." })
    }

    geoCode(address , (error, location) => {
        if (error) {
            return res.send({ error: error })
        }
        else {
            forecast(location, (error, forecast) => {
                if (error) {
                    return res.send({ error: error })
                }
                res.send({
                    forecast,
                    location,
                    address
                });
            })
        }
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title: "404",
        errorText: "404: PAGE NOT FOUND",
        name: "Rohit Singh"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})