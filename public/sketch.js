
let lat, lon;
let units = 'metric';
let data;
let iconCode;
let iconUrl;

function success(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    console.log("latitude:", lat, " longitude:", lon);
    getWeatherData({ 'lat': lat, 'lon': lon })
}

async function getWeatherData(coords) {
    const options = {
        method: 'GET',
    }
    const response = await fetch(`/api/${coords.lat},${coords.lon}`, options
    );
    const json = await response.json();
    console.log("currentWeatherData:", json);
    response.ok ? await updateElements(json) : Promise.reject(json);

}

function updateElements(data) {
    document.getElementById('place').textContent = data.name;
    document.getElementById('lat').textContent = data.coord.lat;
    document.getElementById('lon').textContent = data.coord.lon;
    document.getElementById('weather').textContent = data.weather[0].description;

    document.getElementById('temp').textContent = Math.round(data.main.temp) + ' K';
    document.getElementById("kelvin").onclick = function () { document.getElementById('temp').textContent = Math.round(data.main.temp) + ' K'; };
    document.getElementById("celsius").onclick = function () { document.getElementById('temp').textContent = Math.round(data.main.temp - 273.15) + ' °C'; };
    document.getElementById("fahren").onclick = function () { document.getElementById('temp').textContent = Math.round(data.main.temp - 273.15) * 9 / 5 + 32 + ' °F'; };
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("icon").src = iconUrl;
}



navigator.geolocation.getCurrentPosition(success, (err) => { console.error(err); });
