//-- modules --
import fetchWeather from './fetchweather.mjs';
import autoComplete from './autocomplete.mjs';

//-- constantes --
const weatherForm = document.querySelector('#weatherForm');
const weatherInput = document.querySelector('#weatherInput');
const autoCompleteBox = document.querySelector('#autoCompleteBox');

//-- évènements --
// fetch meteo et image de fond sur saisie utilisateur
weatherForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // récupère la saisie utilisateur pour le fetch météo
    const town = document.querySelector('#weatherInput').value;
    // transforme cette saisie en slug pour le fetch d'image background
    fetchWeather(town);
});

// autocomplete à chaque keyup sur l'input météo
weatherInput.addEventListener('keyup', function (event) {
    event.preventDefault();
    weatherInput.value === '' ? (autoCompleteBox.innerHTML = '') : autoComplete(weatherInput.value);
});

// météo par défault sur la ville de Marseille
fetchWeather('marseille');
