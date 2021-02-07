// change l'image de background en fonction de la ville sur laquelle on effectue une recherche, avec l'APi teleport
const fetchPicture = async function (town) {
    // requête sur la ville recherchée
    const picture = await axios.get(
        `https://api.teleport.org/api/urban_areas/slug:${town}/images/`
    );

    // si on trouve un résultat, affiche l'image de la ville en background
    if (picture) {
        const townPicture = picture.data.photos[0].image.web;
        document.querySelector(
            'body'
        ).style.backgroundImage = `url('${picture.data.photos[0].image.web}')`;
        // sinon, remet la photo d'origine
    } else {
        document.querySelector('body').style.backgroundImage = `url('/img/town.jpg')`;
    }
};

export default fetchPicture;
