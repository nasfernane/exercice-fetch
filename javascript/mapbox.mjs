// récupération du formulaire meteo
const weatherForm = document.querySelector('#weatherForm');

// token mapbox
mapboxgl.accessToken =
    'pk.eyJ1IjoibmFzZmVybmFuZSIsImEiOiJja2t2YmJyaHgxNXExMnBwbDQxODhxY3B3In0.IRJ8HhbNd7iJlTtLsrvPMA';

// création d'une carte avec style personnalisé, sur des coordonnées par défault sur la ville de Marseille
var mapbox = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/nasfernane/ckkvd7zk73u2v17oroy18y63s',
    center: [5.4631, 43.2954],
    zoom: 11,
});

// event sur form météo pour mettre à jour la carte en même temps
weatherForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const latitude = document
        .querySelector('#weatherContainer__autoComplete option')
        .getAttribute('data-lat');
    const longitude = document
        .querySelector('#weatherContainer__autoComplete option')
        .getAttribute('data-lng');

    mapbox.flyTo({
        center: [longitude, latitude],
        essential: true,
    });
});

// export du module
export default mapbox;
