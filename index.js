const express = require('express');
require('dotenv').config();
const app = express();
const fetch = require('node-fetch');

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server listening on port ${port}`));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.post('/api', (req, res) => {
    lat = req.body.lat;
    lon = req.body.lon;
    res.json({
    })
});

app.get('/api/:latlon', async (req, res) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?';
    const api_key = process.env.API_KEY;
    let lat, lon;
    const latlon = req.params.latlon.split(',');
    lat = latlon[0];
    lon = latlon[1];
    const newurl = url + `lat=${lat}&lon=${lon}&appid=${api_key}`;

    try {
        const response = await fetch(newurl, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();

        res.send(data);
    } catch (err) { console.err(err); }
});
