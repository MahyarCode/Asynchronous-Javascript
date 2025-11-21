'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}
///////////////////////////////////////
//TODO adding country details to HTML
const renderCountryInHTML = function (data, className = '') {
    const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1_000_000).toFixed(
                1
            )}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
};
///////////////////////////////////////
// //TODO showing country info
// const getCountryInfo = function (country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();

//     request.addEventListener('load', function () {
//         const [data] = JSON.parse(request.responseText);
//         renderCountryInHTML(data);
//     });
// };

// getCountryInfo('usa');
//////////////////////////////////////////////////////
// //TODO showing multiple country in a specific order (not showing each of them which gets its api faster)
// const getCountryAndNeighbour = function (country) {
//     // AJAX call country 1
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();

//     request.addEventListener('load', function () {
//         const [data] = JSON.parse(request.responseText);

//         // render country 1
//         renderCountryInHTML(data);

//         // Get neighbor country 2
//         const neighbour = data?.borders[0];

//         // AJAX call country 2
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//         request2.send();

//          // NOTE: this is callback hell!!!! writing a callback function in another callback function which results in triangular shape with confusion.
//         request2.addEventListener('load', function () {
//             // console.log(this.responseText);
//             const data2 = JSON.parse(this.responseText);
//             renderCountryInHTML(data2, 'neighbour');
//         });
//     });
// };

// getCountryAndNeighbour('usa');

/////////////////////////////////////////////////////////
//TODO Promise
// NOTE: best thing to run out from callback hell (the triangular code shape with confusion)

// const getCountryData = function (country) {
//     fetch(`https://restcountries.com/v2/name/${country}`)
//         .then(function (response) {
//             console.log('response: ', response);
//             return response.json(); // which is another promise, so we should use another 'then' method
//         })
//         .then(function (data) {
//             console.log('data: ', data);
//             renderCountryInHTML(data[0]);
//         });
// }; // NOTE: the simpler version 👇

// const getCountryData = function (country) {
//     fetch(`https://restcountries.com/v2/name/${country}`)
//         .then(response => response.json())
//         .then(data => renderCountryInHTML(data[0]));
// };
// getCountryData('germany');

// const getCountryDataAndNeighbour = function (country) {
//     fetch(`https://restcountries.com/v2/name/${country}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             renderCountryInHTML(data[0]);
//             const neighbour = data.borders?.[0];
//             return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//         })
//         .then(response => response.json())
//         .then(data => renderCountryInHTML(data, 'neighbour'));
// };

// getCountryDataAndNeighbour('germany');


    .then(data => console.log(data[0]));
