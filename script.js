'use strict';
import { authKey } from './API-KEY.js';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const getCountry = function (country) {
    const apiKey = authKey;
    const urlCountry = `https://api.api-ninjas.com/v1/country?name=${country}`;
    fetch(urlCountry, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(result => {
            const [data] = result;
            console.log('country info: ', data);
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

            const urlFlag = `https://api.api-ninjas.com/v1/countryflag?country=${data.iso2}`;
            const requestFlag = fetch(urlFlag, {
                method: 'GET',
                headers: {
                    'X-Api-Key': apiKey,
                    'Content-Type': 'application/json',
                },
            });
            return requestFlag;
        })
        .then(response => response.json())
        .then(result => {
            const data = result;
            console.log('country flag: ', data);

            const html = `<img class="country__img" src="${data.rectangle_image_url}" />`;
            document.querySelector('.country').insertAdjacentHTML('afterbegin', html);
        })
        .catch(err => console.error(`🔴 ${err} 🔴`));
};
btn.addEventListener('click', function () {
    getCountry('Iran');
});
