// setTimeout(() => {
//     console.log('Two seconds are up');
// }, 2000);

// const names = ['Seungho', 'Jen', 'Jess'];
// const shortNames = names.filter((name) => {
//     return name.length <= 4;
// });

// // This won't work cause event queue will get triggered when the
// // execution stack is empty!
// // const geocode = (address, callback) => {
// //     setTimeout(() => {
// //         const data = {
// //             latitude: 0,
// //             longitute: 0
// //         }
// //         return data;
// //     }, 2000); 
// // }
// // 
// const data = geocode('Philadelphia'); --> This will return undefined.
// console.log(data);     
// 


// const geocode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             latitude: 0,
//             longitute: 0
//         }

//         callback(data)
//     }, 2000);
// }

// geocode('Philadelphia', (d) => {
//     console.log(d);
// });

const add = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b);
    }, 2000);
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})