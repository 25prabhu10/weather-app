const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=df8418c627995bb2f6a1504d2398fab7&query=' +
    encodeURIComponent(latitude) +
    ',' +
    encodeURIComponent(longitude);

  request.get({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!!!', undefined);
    } else if (body.error) {
      callback('Unable to find location!!!', undefined);
    } else {
      callback(undefined, {
        description: body.current.weather_descriptions,
        temperature: body.current.temperature,
        humidity: body.current.humidity,
      });
    }
  });
};

module.exports = forecast;
