'use strict';
import { authKey } from './API-KEY.js';
const btn = document.querySelector('.btn');
const countriesContainer = document.querySelector('.countries');

////////////////////////////////////////////////////////////

const getJSON = function (url, errorMsg = 'Something went wrong') {
    const apiKey = authKey;
    return fetch(url, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json',
        },
    }).then(response => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
        return response.json();
    });
};

const getFlag = function (data) {
    return getJSON(`https://api.api-ninjas.com/v1/countryflag?country=${data.iso2}`);
};

const renderHTML = function (data) {
    const html = `
        <article class="country">
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1_000).toFixed(
                    1
                )}M people</p>
                <p class="country__row"><span>🏢</span>${data.capital}</p>
                <p class="country__row"><span>💰</span>${data.currency.name}</p>
            </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
};

const renderImg = function (data) {
    const html = `<img class="country__img" src="${data.rectangle_image_url}" />`;
    document.querySelector('.country').insertAdjacentHTML('afterbegin', html);
};

////////////////////////////////////////////////////

const getCountry = function (country) {
    getJSON(`https://api.api-ninjas.com/v1/country?name=${country}`)
        .then(result => {
            const [data] = result;
            // console.log('country info: ', data);
            renderHTML(data);
            return getFlag(data);
        })
        .then(result => {
            const data = result;
            // console.log('country flag: ', data);
            renderImg(data);
        })
        .catch(err => console.error(`🔴 ${err} 🔴`));
};

btn.addEventListener('click', function () {
    getCountry('Iran');
});
