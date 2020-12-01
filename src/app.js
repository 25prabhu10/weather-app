const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

// DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// SETUP handlebars ENGINE AND VIEWS LOCATION
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// SETUP STATIC DIRECTORY TI SERVE
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Mort',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Robot',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'IT',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'An address is required...',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, data) => {
        if (error) {
          return res.send({ error });
        }
        res.send({ forecast: data, location, address: req.query.address });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404page', {
    title: '',
    errorMessage: 'Help Page Not Found',
  });
});

app.get('*', (req, res) => {
  res.render('404page', {
    title: '404',
    errorMessage: '404 Page Not Found',
  });
});

app.listen(port, () => {
  console.log('Server running on port ' + port);
});
