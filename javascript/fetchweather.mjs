// STATION METEO
const fetchWeather = async function (town) {
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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${finalTown}&appid=67173c519205d685b546a19f56219ebc&lang=fr`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${finalTown}
    &appid=67173c519205d685b546a19f56219ebc&lang=fr&units=metric`;

    // requête météo
    const townWeather = await axios.get(url);
    const forecastWeather = await axios.get(forecastUrl);
    const temperatures = forecastWeather.data.list;
    // création de tableaux pour push seulement les données de l'heure qui nous intéresse
    const newTemperatures = [];
    const feelTemperatures = [];

    // ajout en première valeur, la première donnée pour moment actuel
    newTemperatures.push(temperatures[0].main.temp);
    feelTemperatures.push(temperatures[0].main.feels_like);

    // ajoute les valeurs des cinq prochains jours à 12h00
    temperatures.forEach(element => {
        if (element.dt_txt.includes('12:00:00')) {
            newTemperatures.push(element.main.temp);
            feelTemperatures.push(element.main.feels_like);
        }
    });

    // mise à jour du graphique
    updateChart(newTemperatures, feelTemperatures);
    myChart.update();

    // insertion encart météo
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
                icon = `./img/001-cloudy day.png`;
                break;
            case 'peu nuageux':
                icon = `./img/005-cloudy.png`;
                break;
            case 'partiellement nuageux':
                icon = `./img/005-cloudy.png`;
                break;
            case 'ciel dégagé':
                icon = `./img/002-sunny.png`;
                break;
            case 'brume':
                icon = `./img/007-windy.png`;
                break;
            case 'légères chutes de neige':
                icon = `./img/006-snowy.png`;
                break;
        }

        weatherContainer.innerHTML = '';

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
