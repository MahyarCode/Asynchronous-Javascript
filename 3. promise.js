// 'use strict';

// const lotteryPromise = new Promise(function (resolve, reject) {
//     console.log('the Lottery is pending 🗿');

//     if (Math.random() > 0.5) {
//         resolve('You won the lottery ✅'); // the output of promise if resolved
//     } else {
//         reject('You lost ❌'); // the output of promise if rejected
//     }
// });

// // Promisifying
// const wait = function (seconds) {
//     return new Promise(function (resolve) {
//         setTimeout(() => {
//             resolve(`took ${seconds} second to run`);
//         }, seconds * 1000);
//     });
// };
// wait(0).then(res => console.log(res));

// // the setTimeout is the last priority to run in the same time with promises
// setTimeout(() => {
//     console.log('settimeout in 0 second');
// }, 0);

// lotteryPromise.then(res => console.log(res)).catch(rej => console.error(rej));

// const operationPromise = new Promise(function (resolve) {
//     for (let i = 0; i < 3000000000; i++) {
//         let th = 0;
//     }
//     resolve('resolved after 3000000000 time operation');
// });

// operationPromise.then(res => console.log(res));

// Geolocation turns into promise:\

// //todo how to get position
// navigator.geolocation.getCurrentPosition(
//     position => console.log(position),
//     err => console.log(err)
// );

//todo how to get position using promise
const getPosition = function () {
    return new Promise(function (resolve, reject) {
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position),
        //     err => reject(err)
        // ); //👇👇

        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

getPosition().then(position => console.log(position.coords));
