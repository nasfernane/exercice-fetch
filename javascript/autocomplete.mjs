// import modules
import fetchWeather from './fetchweather.mjs';
import mapbox from './mapbox.mjs';

const dataList = document.querySelector('#weatherContainer__autoComplete');
const weatherInput = document.querySelector('#weatherInput');

const inputUpdate = function () {
    const town = weatherInput.value;
    let latitude;
    let longitude;

    const dataOptions = Array.from(
        document.querySelectorAll('#weatherContainer__autoComplete option')
    );

    for (let i = 0; i < dataOptions.length; i++) {
        if (dataOptions[i].value === weatherInput.value) {
            latitude = dataOptions[i].getAttribute('data-lat');
            longitude = dataOptions[i].getAttribute('data-lng');
        }
    }

    mapbox.flyTo({
        center: [longitude, latitude],
        essential: true,
    });

    fetchWeather(town);
};

// AUTOCOMPLETE
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

    dataList.innerHTML = '';

    // pour chaque résultat, on ajoute une option
    for (let i = 0; i < res.data.hits.length; i++) {
        dataList.insertAdjacentHTML(
            'beforeend',
            `
        <option value="${res.data.hits[i].locale_names.default[0]}" data-lat="${res.data.hits[i]._geoloc.lat}" data-lng="${res.data.hits[i]._geoloc.lng}"/>
        `
        );
    }

    // supprime les anciens évènement pour éviter le cumul
    weatherInput.removeEventListener('change', inputUpdate, false);
    weatherInput.addEventListener('change', inputUpdate, false);
};

export default autoComplete;
