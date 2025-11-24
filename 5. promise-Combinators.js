'use strict';
const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url, {
        method: 'GET',
    }).then(response => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
        return response.json();
    });
};

//TODO Promise.all(): async await in parallel (loading multiple call at the same time)

const get3Countries = async function (c1, c2, c3) {
    const data = await Promise.all([
        getJSON(`https://restcountries.com/v2/name/${c1}`),
        getJSON(`https://restcountries.com/v2/name/${c2}`),
        getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    // one fail promise makes the whole promise get error.
    // a useful technique for checking all promises at the same time
    console.log(
        'Promise.all()',
        data.map(d => d[0].capital)
    );
};
get3Countries('Iran', 'Germany', 'Armenia');

//TODO Promise.race: receives an array of promises and returns a promise
// the winning promise is the promise that has fetched faster than others (no matter it fulfilled or rejected)
(async function () {
    const res = await Promise.race([
        getJSON(`https://restcountries.com/v2/name/Iran`),
        getJSON(`https://restcountries.com/v2/name/Germany`),
        getJSON(`https://restcountries.com/v2/name/Armenia`),
    ]);
    console.log('Promise.race()', res);
})();

// const timeout = function (seconds) {
//     return new Promise(function (_, reject) {
//         setTimeout(() => {
//             reject(new Error('request too long'));
//         }, seconds * 1000);
//     });
// };

// Promise.race([getJSON(`https://restcountries.com/v2/name/Iran`), timeout(0.4)])
//     .then(res => console.log('Promise.race()', res[0]))
//     .catch(err => console.error(err));

//TODO Promise.allSettled: receives an array of promises and returns array of all the promises that are settled
// all the rejected and fulfilled promises

(async function () {
    const res = await Promise.allSettled([
        getJSON(`https://restcountries.com/v2/name/Iran`),
        getJSON(`https://restcountries.com/v2/name/2345678`),
        getJSON(`https://restcountries.com/v2/name/Armenia`),
    ]);
    console.log('Promise.allSettled()', res);
})();

//TODO Promise.any: receives an array of promises and returns the first fulfilled element

(async function () {
    const res = await Promise.any([
        getJSON(`https://restcountries.com/v2/name/Iran`),
        getJSON(`https://restcountries.com/v2/name/2345678`),
        getJSON(`https://restcountries.com/v2/name/Armenia`),
    ]);
    console.log('Promise.any()', res);
})();
