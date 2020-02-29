let a = [1, 2, 3]

a.forEach(function(e) {
    console.log(e);
    console.log(this)
});