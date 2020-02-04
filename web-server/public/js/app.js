// This is a client side code since it is linked by <script> tag to one of the HTML files
// So server side cannot be used here!

console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // This prevents refreshing the page after submitting

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    const location = search.value;

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    });
})