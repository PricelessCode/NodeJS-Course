// const square = function(x) {
//     return x * x
// }

// const square = (x) => {
//     return x * x
// }

// const square = x => x * x;


// console.log(square(4));


// const event = {
//     name: 'Birthday Party',
//     printGuestList: function() {
//         console.log('Guest list for ' + this.name)
//     }
// }


// // Arrow functions don't bind
// const event = {
//     name: 'Birthday Party',
//     printGuestList: () => {
//         console.log('Guest list for ' + this.name)
//     }
// }


// // Shorter form for function() but this is not an arrow function!
// // That's from ES6!
// const event = {
//     name: 'Birthday Party',
//     printGuestList() {
//         console.log('Guest list for ' + this.name)
//     }
// }


////////////////////////
/////When to use Array Function?!

// const event = {
//     name: 'Birthday Party',
//     guestList: ['Andrew', 'Jen', 'Mike'],
//     printGuestList() {
//         console.log('Guest list for ' + this.name)

//         // Getting undefined cause of this binding.
//         this.guestList.forEach(function(guest) {
//             console.log(guest + ' is attending ' + this.name);
//         });
//     }
// }

const event = {
    name: 'Birthday Party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList() {
        console.log('Guest list for ' + this.name)

        // Getting undefined cause of this binding.
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name);
        });
    }
}




event.printGuestList();