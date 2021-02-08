// STATION METEO
const fetchWeather = async function (town) {
    // vide la valeur des précédentes recherches
    weatherInput.value = '';

    const tempTown = town.split(' ');
    let townArray = [];

    // pour enlever les résultats arrondissements, on split l'auto-complétion, vérifie si l'élément et un nombre ou égal à Arrondissement
    tempTown.forEach(element => {
        if (!Number.isInteger(element.split('')[0] * 1) && element !== 'Arrondissement') {
            townArray.push(element);
        }
    });

    // on ré-assemble le tableau pour les noms de villes composés
    const finalTown = townArray.join(' ');

    // url à laquelle on interpole la saisie utilisateur
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${finalTown}&appid=67173c519205d685b546a19f56219ebc&lang=fr`;
    const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${finalTown}
    &appid=67173c519205d685b546a19f56219ebc&lang=fr&units=metric`;

    // requête météo
    const townWeather = await axios.get(url);
    const forecastWeather = await axios.get(forecastUrl);
    const temperatures = forecastWeather.data.list;
    const newTemperatures = [];
    const feelTemperatures = [];

    console.log(forecastWeather);

    newTemperatures.push(temperatures[0].main.temp);
    feelTemperatures.push(temperatures[0].main.feels_like);

    temperatures.forEach(element => {
        if (element.dt_txt.includes('12:00:00')) {
            newTemperatures.push(element.main.temp);
            feelTemperatures.push(element.main.feels_like);
        }
    });

    updateChart(newTemperatures, feelTemperatures);
    myChart.update();

    // températures

    if (townWeather) {
        // variables
        const weatherContainer = document.querySelector('.weatherContainer');
        const townTemp = Math.trunc(townWeather.data.main.temp - 273.15);
        const tempMin = Math.trunc(townWeather.data.main.temp_min - 273.15);
        const tempMax = Math.trunc(townWeather.data.main.temp_max - 273.15);
        const townSky = townWeather.data.weather[0].description;
        let icon;

        switch (townSky) {
            case 'couvert':
                icon = `./img/001-cloudy day.png`;
                break;
            case 'ensoleillé':
                icon = `./img/002-sunny.png`;
                break;
            case 'nuageux':
                icon = `./img/005-cloudy.png`;
                break;
            case 'partiellement nuageux':
                icon = `./img/005-cloudy.png`;
                break;
            case 'ciel dégagé':
                icon = `./img/002-sunny.png`;
                break;
        }

        weatherContainer.innerHTML = '';

        console.log(townWeather);

        weatherContainer.insertAdjacentHTML(
            'beforeend',
            `
            <div id="weather">
                <p>Aujourd'hui à ${town}: ${townTemp}°C, ${townSky}. </p>
                <img src="${icon}" id="weatherIcon" />
            </div>
            <div class="weatherInfos">
                <p>Température minimale : ${tempMin}°C</p>
                <p>Température maximale : ${tempMax}°C</p>
            </div>
        
            <div class="weatherInfos">
                <p>Pression atmosphérique : ${townWeather.data.main.pressure} hPa</p>
                <p>Précipitations : ${townWeather.data.main.humidity} %</p>
                <p>Vent : ${townWeather.data.wind.speed} m/s</p>
            </div>
            

        `
        );
    }
};

export default fetchWeather;
