// openWeather pai = a669e852bc22e5af85701cae74eb5a75
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=a669e852bc22e5af85701cae74eb5a75

const request = require('request');

const geoCode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoidmFjaXhhODY4MSIsImEiOiJja2kycmQ0MGQxMnhkMnhtc2JtaHZhZW9hIn0.BUHidMzafDJwzB2vEaYIwQ&limit=1';

  request.get({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!!!', undefined);
    } else if (body.features.length == 0) {
      callback('Unable to find location. Try another search!!!', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
