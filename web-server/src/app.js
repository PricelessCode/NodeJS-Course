const path = require('path');
const express = require('express');
const hbs = require('hbs'); // Need this for partial template

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

// Define paths Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Seungho Lee'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Seungho Lee'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Seungho Lee'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    // we have to provide a default value for lat, long, location else, it will crash when destructuring in the parameter
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Seungho Lee',
        errorMesage: 'Help article not found'
    });
});

// This route for 404 has to come at last(after all routes set ups)
// * means match anything that will not be matched above
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Seungho Lee',
        errorMesage: 'Page not found'
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});