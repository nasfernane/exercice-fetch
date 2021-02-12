//-- import modules --
import fetchWeather from './fetchweather.mjs';
import mapbox from './mapbox.mjs';

//-- constantes, récupération des éléments --
const autoCompBox = document.querySelector('#autoCompleteBox');
const weatherInput = document.querySelector('#weatherInput');

//-- fonctions --

// autocomplete
const autoComplete = async function (input) {
    // stocke le retour de la requête axios dans une constante
    const res = await axios({
        // méthode
        method: 'POST',
        // url
        url: 'https://places-dsn.algolia.net/1/places/query',
        // donnée envoyées dans le body de la requête
        data: { query: input, type: 'city', hitsPerPage: '3' },
    });

    // vide résultats précédents
    autoCompBox.innerHTML = '';

    // insertion du select
    autoCompBox.insertAdjacentHTML(
        'beforeend',
        `<select id="weatherContainer__autoComplete" size="3"></select>`
    );

    // récupération du select
    const autoCompleteContainer = document.querySelector('#weatherContainer__autoComplete');

    // ajout des options sur select
    for (let i = 0; i < res.data.hits.length; i++) {
        autoCompleteContainer.insertAdjacentHTML(
            'beforeend',
            `
        <option value="${res.data.hits[i].locale_names.default[0]}" data-lat="${res.data.hits[i]._geoloc.lat}" data-lng="${res.data.hits[i]._geoloc.lng}"> ${res.data.hits[i].locale_names.default[0]} </option>
        `
        );
    }

    // récupération des options
    const options = autoCompleteContainer.querySelectorAll('option');

    // event principal
    weatherInput.addEventListener('submit', function () {
        let latitude;
        let longitude;

        // boucle sur les résultats Algolia pour trouver un match et récupère ses coordonnées
        for (let i = 0; i < options.length; i++) {
            if (options[i].value == weatherInput.value) {
                latitude = options[i].getAttribute('data-lat');
                longitude = options[i].getAttribute('data-lng');
            }
        }

        // maj interface
        fetchWeather(weatherInput.value);

        mapbox.flyTo({
            center: [longitude, latitude],
            essential: true,
        });
    });

    // events click sur les options
    options.forEach(element => {
        element.addEventListener('click', function () {
            weatherInput.value = element.value;

            const latitude = element.getAttribute('data-lat');
            const longitude = element.getAttribute('data-lng');

            fetchWeather(weatherInput.value);
            mapbox.flyTo({
                center: [longitude, latitude],
                essential: true,
            });
            autoCompBox.innerHTML = '';
        });
    });

    // event clavier sur le select (navigation clavier)
    autoCompleteContainer.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            weatherInput.value = autoCompleteContainer.value;
            let longitude;
            let latitude;

            for (let i = 0; i < options.length; i++) {
                if (options[i].value == weatherInput.value) {
                    latitude = options[i].getAttribute('data-lat');
                    longitude = options[i].getAttribute('data-lng');
                }
            }

            fetchWeather(weatherInput.value);
            mapbox.flyTo({
                center: [longitude, latitude],
                essential: true,
            });
            autoCompBox.innerHTML = '';
        }
    });
};

export default autoComplete;
