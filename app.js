const weatherForm = document.querySelector('#weatherForm');
const weatherInput = document.querySelector('#weatherInput');
const autoCompleteContainer = document.querySelector('#weatherContainer__autoComplete');

// STATION METEO
const fetchWeather = async function (town) {
    weatherInput.value = '';

    // url à laquelle on interpole la saisie utilisateur
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${town}&appid=67173c519205d685b546a19f56219ebc&lang=fr`;

    // requête météo
    const townWeather = await axios.get(url);

    if (townWeather) {
        // variables
        const weatherContainer = document.querySelector('.weatherContainer');
        const townTemp = Math.trunc(townWeather.data.main.temp - 273.15);
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

        weatherContainer.insertAdjacentHTML(
            'beforeend',
            `
            <div id="weather">
                <p>Aujourd'hui à ${town}: ${townTemp}°C, ${townSky}. </p>
                <img src="${icon}" id="weatherIcon" />
            </div>

        `
        );
    }
};

fetchPicture = async function (town) {
    const picture = await axios.get(
        `https://api.teleport.org/api/urban_areas/slug:${town}/images/`
    );

    if (picture) {
        townPicture = picture.data.photos[0].image.web;
        document.querySelector(
            'body'
        ).style.backgroundImage = `url('${picture.data.photos[0].image.web}')`;
    } else {
        document.querySelector('body').style.backgroundImage = `url('/img/town.jpg')`;
    }
};

weatherForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const town = document.querySelector('#weatherInput').value;
    const firstSlug = town.split(' ').join('-').toLowerCase();
    fetchWeather(town);
    fetchPicture(firstSlug);
});

// AUTOCOMPLETE
const autoComplete = async function (input) {
    const res = await axios({
        method: 'POST',
        url: 'https://places-dsn.algolia.net/1/places/query',
        data: JSON.stringify({ query: input, type: 'city', hitsPerPage: '3' }),
    });

    console.log(res.data.hits);

    autoCompleteContainer.innerHTML = '';

    for (let i = 0; i < res.data.hits.length; i++) {
        autoCompleteContainer.insertAdjacentHTML(
            'beforeend',
            `
        <p data-lat="${res.data.hits[i]._geoloc.lat}" data-lgn="${res.data.hits[i]._geoloc.lat}">${res.data.hits[i].locale_names.default[0]}</p>
        `
        );
    }

    document.querySelectorAll('#weatherContainer__autoComplete p').forEach(element => {
        element.addEventListener('click', function () {
            fetchWeather(element.innerHTML);
            console.log(element.getAttribute('data-lat'));
            weatherInput.value = `${element.innerHTML}`;
            autoCompleteContainer.innerHTML = '';
        });
    });
};

weatherForm.addEventListener('keyup', function (event) {
    event.preventDefault();
    if (weatherInput.value !== '') autoComplete(weatherInput.value);
    if (weatherInput.value == '') autoCompleteContainer.innerHTML = '';
});

// AUTRES EXERCICES

// 1ère phase : déclaration des variables
const movieForm = document.querySelector('#movieForm');

// 2ème phase : déclaration des fonctions
const seekMovies = async function (movie) {
    const url = `http://www.omdbapi.com/?s=${movie}&apikey=883541da`;

    const movies = await axios.get(url);

    movies.data.Search.forEach(element => {
        document.querySelector('.imgContainer').insertAdjacentHTML(
            'beforeend',
            `
            <li>
            <img src="${element.Poster}"/>
            <h4>${element.Title}</h4>
            </li>
        `
        );
    });
};

// 3ème phase : déclaration des écouteurs
movieForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const movie = document.querySelector('#movieInput').value;
    seekMovies(movie);
});

// JSON PLACEHOLDER
// (async function () {
//     const users = await axios.get('https://jsonplaceholder.typicode.com/users');
//     const posts = await axios.get('https://jsonplaceholder.typicode.com/posts');
//     const user1Posts = await axios.get('https://jsonplaceholder.typicode.com/users/1/posts');
//     const user1Comments = await axios.get(
//         'https://jsonplaceholder.typicode.com/users/1/comments?postId=1'
//     );
//     const albumPhotos = await axios.get('https://jsonplaceholder.typicode.com/albums/1/photos');

//     // console.log('utilisateurs :', users.data);
//     // console.log('posts :', posts.data);
//     // console.log('posts de user 1 :', user1Posts.data);
//     // console.log('Commentaire :', user1Comments.data);
//     // console.log('Photos :', albumPhotos.data);

//     albumPhotos.data.forEach(element => {
//         document.querySelector('.albumsContainer').insertAdjacentHTML(
//             'beforeend',
//             `
//         <img src="${element.thumbnailUrl}">
//         `
//         );
//     });
// })();

// seekMovies('Marvel');
