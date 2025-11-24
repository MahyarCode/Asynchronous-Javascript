// DESC like the challenge1.js file, but the country is shown with the current gps location details.
const btnWhereAmI = document.querySelector('.btn-country');
const countryInfo = document.querySelector('.countries');

const renderCountryInHTML = function (data, className = '') {
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                    <h3 class="country__name">${data.name}</h3>
                    <h4 class="country__region">${data.region}</h4>
                    <p class="country__row"><span>👫</span>${(+data.population / 1_000_000).toFixed(
                        1
                    )}M People</p>
                    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
        </article>
    `;
    countryInfo.insertAdjacentHTML('beforeend', html);
    countryInfo.style.opacity = 1;
};

const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const whereAmI = function () {
    getPosition()
        .then(position => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude);
            return fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
            );
        })
        .then(function (res) {
            console.log(res);

            if (!res.ok) {
                throw new Error(`Problem with geocoding ${res.status}`);
            }
            // console.log(res.json());
            return res.json();
        })
        .then(function (data) {
            // console.log(data);
            console.log(`you are in ${data.city}, ${data.countryName}`);
            return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
        })
        .then(res => res.json())
        .then(data => {
            console.log(data[0]);
            renderCountryInHTML(data[0]);
            const neighbour = data[0]?.borders?.[0];
            return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            renderCountryInHTML(data, 'neighbour');
        })
        // .then(data => {
        //     console.log(data);
        // })
        .catch(err => console.error(`****** ${err.message} ******`));
};

btnWhereAmI.addEventListener('click', function (e) {
    e.preventDefault();
    whereAmI();
});
