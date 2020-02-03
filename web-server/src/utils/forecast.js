const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/2e6ac80b7493c74c4f47a20ebc0de789/' + lat + ',' + long + '?units=si';
    request({ url, json: true }, (error, { body }) => {
        if (error) { // Errors like internet disconnected(Low level error)
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) { // Errors like mistyped or etc
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.');
        }
    });
}

module.exports = forecast;