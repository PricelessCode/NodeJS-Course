const path = require('path');
const express = require('express');
const hbs = require('hbs'); // Need this for partial template


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
    res.send({
        location: 'Seoul'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});