// import modules
import fetchWeather from './fetchweather.mjs';
import mapbox from './mapbox.mjs';

const autoCompleteBox = document.querySelector('.autoCompleteBox');

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

    // on vide la box pour effacer les recherches précédentes
    autoCompleteBox.innerHTML = '';

    // ajout du container
    autoCompleteBox.insertAdjacentHTML(
        'beforeend',
        `
        <select id="weatherContainer__autoComplete" size="3"></select>
    `
    );

    const autoCompleteContainer = document.querySelector('#weatherContainer__autoComplete');

    // pour chaque résultat, on ajoute une option
    for (let i = 0; i < res.data.hits.length; i++) {
        autoCompleteContainer.insertAdjacentHTML(
            'beforeend',
            `
        <option data-lat="${res.data.hits[i]._geoloc.lat}" data-lng="${res.data.hits[i]._geoloc.lng}" value="${res.data.hits[i].locale_names.default[0]}">${res.data.hits[i].locale_names.default[0]}</option>
        `
        );
    }

    autoCompleteContainer.addEventListener('click', function (e) {
        console.log('coucou');
        const town = e.target.innerHTML;
        const longitude = e.target.getAttribute('data-lng');
        const latitude = e.target.getAttribute('data-lat');
        fetchWeather(town);

        // vide l'input utilisateur et le conteneur autocomplete
        weatherInput.value = `${e.target.innerHTML}`;
        autoCompleteContainer.innerHTML = '';

        mapbox.flyTo({
            center: [longitude, latitude],
            essential: true,
        });

        autoCompleteContainer.style.display = 'none';
    });

    autoCompleteContainer.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const town = autoCompleteContainer.value;
            console.log(town);
            let latitude;
            let longitude;

            // récupère les options du select puis boucle dessus pour récupérer les coordonnées correspondantes
            const options = autoCompleteContainer.querySelectorAll('option');

            for (let i = 0; i < options.length; i++) {
                if (options[i].value == autoCompleteContainer.value) {
                    latitude = options[i].getAttribute('data-lat');
                    longitude = options[i].getAttribute('data-lng');
                }
            }

            console.log(latitude, longitude);

            // vide l'input utilisateur et le conteneur autocomplete
            weatherInput.value = autoCompleteContainer.value;
            autoCompleteContainer.innerHTML = '';

            fetchWeather(town);

            mapbox.flyTo({
                center: [longitude, latitude],
                essential: true,
            });

            autoCompleteContainer.style.display = 'none';
        }
    });
};

export default autoComplete;
