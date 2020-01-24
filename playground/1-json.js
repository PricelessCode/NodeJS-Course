const fs = require('fs');

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Eyan Holiday'
// }


// // console.log(book);

// const bookJSON = JSON.stringify(book);
// // console.log(bookJSON);

// // const parseData = JSON.parse(bookJSON);
// // console.log(parseData);
// // console.log(parseData.title);

// fs.writeFileSync('1-json.json', bookJSON) 

// const dataBuffer = fs.readFileSync('1-json.json');
// console.log(dataBuffer);
// console.log(dataBuffer.toString());

// const dataJSON = JSON.parse(dataBuffer);
// console.log(dataJSON)

/////////////////////////////////////////////
///////////////CHALLENGE/////////////////////


const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = JSON.parse(dataBuffer);
dataJSON.name = "Seungho"
dataJSON.age = 21
const stringified = JSON.stringify(dataJSON);

fs.writeFileSync('1-json.json', stringified);