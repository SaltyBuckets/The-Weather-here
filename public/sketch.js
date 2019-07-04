let url = 'http://api.openweathermap.org/data/2.5/weather?';
let api_key = 'process.env.API_KEY';
let lat, lon;
let units = 'metric';
let data;
let iconCode;
let iconUrl;
async function fetchAsync(newurl) {
    let response = await fetch(newurl);
    let datajson = await response.json();
    data = await datajson;
    await console.log(data);
    await updateElements();
}

function success(pos) {
    console.log(pos);

    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
    console.log(lat, lon);
    var newurl = url + `lat=${lat}&lon=${lon}&appid=${api_key}&units=${units}`;
    console.log(newurl);
    fetchAsync(newurl);

}

function updateElements() {
    document.getElementById('temp').textContent = data.main.temp;
    document.getElementById('place').textContent = data.name;
    document.getElementById('lat').textContent = lat;
    document.getElementById('lon').textContent = lon;
    document.getElementById('weather').textContent = data.weather[0].description;
    let temp_units;
    if (units == 'metric') temp_units = 'C'
    else if (units == 'imperial') temp_units = 'F'
    else temp_units = 'K';
    document.getElementById('temp').textContent = data.main.temp;
    iconCode = data.weather[0].icon;
    iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("icon").src = iconUrl;
}



navigator.geolocation.getCurrentPosition(success, (err) => { console.error(err); });
