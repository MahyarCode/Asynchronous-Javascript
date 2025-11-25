'use strict';

const btn = document.querySelector('.btn');
const countriesContainer = document.querySelector('.countries');

//todo async await for rendering a specific country
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
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
};

const whereAmI1 = async function (country) {
    try {
        const res = await fetch(`https://restcountries.com/v2/name/${country}`);
        // console.log(res);
        const result = await res.json();
        console.log(result);
        renderCountryInHTML(result[0]);
    } catch (error) {
        console.log(error.message);
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//todo async await for rendering current position

const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const whereAmI2 = async function () {
    try {
        const position = await getPosition();
        const { latitude, longitude } = position.coords;
        const resInfo = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
        );

        if (!resInfo.ok) throw new Error('Problem getting Location Data');

        const jsonResInfo = await resInfo.json();

        const result = await fetch(`https://restcountries.com/v2/name/${jsonResInfo.countryName}`);
        if (!result.ok) throw new Error('Problem getting Country Data');

        const jsonResult = await result.json();

        renderCountryInHTML(jsonResult[0]);

        return `${jsonResInfo.city}`;
    } catch (error) {
        // for catching error in async function, we should throw it here and then catch it when we call the function
        throw error;
    }
};

btn.addEventListener('click', function (e) {
    e.preventDefault();

    // IIFE (Immediately-Invoked Function Expression)
    (async function () {
        try {
            const city = await whereAmI2();
            console.log(city);
        } catch (error) {
            console.log(error.message);
        }
        console.log('The End');
    })();

    //         //  ☝️☝️☝️ the next 2 lines are for error handling
    //         .then(city => console.log(`${city}`))
    //         .catch(err => console.error(`${err.message}`))
    //         .finally(() => console.log('The End'));
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url, {
        method: 'GET',
    }).then(response => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
        return response.json();
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
