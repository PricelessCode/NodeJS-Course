const greeter = (name = 'User', age) => {
    console.log('Hello ' + name);
}

greeter('Seungho');
greeter();


const transaction = (type, { label = 'Something', stock = 99 } = {}) => {
    console.log(type, label, stock)
}

transaction('order');