const weatherForm = document.querySelector('#weatherForm');
const movieForm = document.querySelector('#movieForm');

// fonctions
const seekMovies = async function (movie) {
    const url = `http://www.omdbapi.com/?s=${movie}&apikey=883541da`;
    console.log(url);
    const universe = await (await fetch(url)).json();

    universe.Search.forEach(movie => {
        console.log(movie.Title, movie.Year);
        document.querySelector('.imgContainer').insertAdjacentHTML(
            'beforeend',
            `
            <li>
            <img src="${movie.Poster}"/>
            <h4>${movie.Title}</h4>
            </li>
        
        `
        );
    });
};

const fetchWeather = async function (town) {
    // url à laquelle on interpole la saisie utilisateur
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${town}&appid=67173c519205d685b546a19f56219ebc&lang=fr`;

    // requête météo
    const townWeather = await (await fetch(url)).json();

    // variables
    const weatherContainer = document.querySelector('.weatherContainer');
    const townTemp = Math.trunc(townWeather.main.temp - 273.15);
    const townSky = townWeather.weather[0].description;
    let icon;
    console.log(townSky);

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

    weatherContainer.insertAdjacentHTML(
        'beforeend',
        `   
            <div id="weather">
                <p>Aujourd'hui à ${town}, il fait ${townTemp} °C et le temps est ${townSky}. </p>
                <img src="${icon}" id="weatherIcon" />
            </div>
            

        `
    );
};

fetchWeather('Marseille');
seekMovies('Marvel');

// events

weatherForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const town = document.querySelector('#weatherInput').value;
    fetchWeather(town);
});

movieForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const movie = document.querySelector('#movieInput').value;
    seekMovies(movie);
});
