// import modules
import fetchWeather from './fetchweather.mjs';
// import fetchPicture from './fetchpicture.mjs';
import mapbox from './mapbox.mjs';

const autoCompleteContainer = document.querySelector('#weatherContainer__autoComplete');

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

    // on vide le conteneur autocomplete pour les recherches précédentes
    autoCompleteContainer.innerHTML = '';

    // pour chaque résultat, on ajoute une auto-complétion sous l'input
    for (let i = 0; i < res.data.hits.length; i++) {
        autoCompleteContainer.insertAdjacentHTML(
            'beforeend',
            `
        <p data-lat="${res.data.hits[i]._geoloc.lat}" data-lng="${res.data.hits[i]._geoloc.lng}">${res.data.hits[i].locale_names.default[0]}</p>
        `
        );
    }

    // pour chaque auto-complétion créée, on ajoute un écouteur pour fetch la météo sur click
    document.querySelectorAll('#weatherContainer__autoComplete p').forEach(element => {
        element.addEventListener('click', function () {
            const town = element.innerHTML;
            const map = document.querySelector('#map');
            // transforme cette saisie en slug pour le fetch d'image background
            // const townSlug = town.split(' ').join('-').toLowerCase();
            const latitude = element.getAttribute('data-lng');
            const longitude = element.getAttribute('data-lat');
            fetchWeather(town);
            // fetchPicture(townSlug);

            // ajoute les coordonnées à la map selon la ville choisie
            // map.setAttribute('data-lgn', element.getAttribute('data-lng'));
            // map.setAttribute('data-lat', element.getAttribute('data-lat'));
            // vide l'input utilisateur et le conteneur autocomplete
            weatherInput.value = `${element.innerHTML}`;
            autoCompleteContainer.innerHTML = '';

            mapbox.flyTo({
                center: [latitude, longitude],
                essential: true,
            });
        });
    });
};

export default autoComplete;
