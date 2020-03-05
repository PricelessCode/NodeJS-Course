const doSomethingAsync = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve('I did something'), 3000)
    })
}
const doNothingSync = () => {
    setTimeout(() => {
            return 'YAY!'
        },
        1000);
}


const doSomething = async() => {
    console.log('1')
    const a = await doSomethingAsync();
    console.log(a);
    return 'DONE!';
}

console.log('Before')
var a = 10;
doSomething().then(() => {
    var a = 15;
});
console.log(a);
console.log('After')