const https = require('https');

const url = 'https://api.darksky.net/forecast/2e6ac80b7493c74c4f47a20ebc0de789/40,-75?units=si';

const request = https.request(url, (response) => {

    let data = '';

    response.on('data', (chunk) => { //.on() is just like addListener()
        data = data + chunk.toString();
        console.log(data);
    });

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body)
    });
});

request.on('error', (error) => {
    console.log('An error', error)
});

request.end();