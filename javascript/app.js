//-- modules --
import fetchWeather from './fetchweather.mjs';
// import fetchPicture from './fetchpicture.mjs';
import autoComplete from './autocomplete.mjs';
import mapbox from './mapbox.mjs';
// import myChart from './myChart.mjs';

//-- constantes --
const weatherForm = document.querySelector('#weatherForm');
const weatherInput = document.querySelector('#weatherInput');
const autoCompleteContainer = document.querySelector('#weatherContainer__autoComplete');

//-- évènements --
// fetch meteo et image de fond sur saisie utilisateur
weatherForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // récupère la saisie utilisateur pour le fetch météo
    const town = document.querySelector('#weatherInput').value;
    // transforme cette saisie en slug pour le fetch d'image background
    const townSlug = town.split(' ').join('-').toLowerCase();
    fetchWeather(town);
    // fetchPicture(townSlug);
});

// autocomplete à chaque keyup sur l'input météo
weatherInput.addEventListener('keyup', function (event) {
    event.preventDefault();

    weatherInput.value === ''
        ? (autoCompleteContainer.innerHTML = '')
        : autoComplete(weatherInput.value);
});

// AUTRES EXERCICES
// A garder pour Claude

// // 1ère phase : déclaration des variables
// const movieForm = document.querySelector('#movieForm');

// // 2ème phase : déclaration des fonctions
// const seekMovies = async function (movie) {
//     const url = `http://www.omdbapi.com/?s=${movie}&apikey=883541da`;

//     const movies = await axios.get(url);

//     movies.data.Search.forEach(element => {
//         document.querySelector('.imgContainer').insertAdjacentHTML(
//             'beforeend',
//             `
//             <li>
//             <img src="${element.Poster}"/>
//             <h4>${element.Title}</h4>
//             </li>
//         `
//         );
//     });
// };

// // 3ème phase : déclaration des écouteurs
// movieForm.addEventListener('submit', function (event) {
//     event.preventDefault();
//     const movie = document.querySelector('#movieInput').value;
//     seekMovies(movie);
// });

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
