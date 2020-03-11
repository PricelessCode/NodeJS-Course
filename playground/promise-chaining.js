require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('5e4a4072f9c264366102f447', { age: 1 }).then((user) => {
    console.log(user);

    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((e) => { // catches any errors from above two cases.
    console.log(e)
});

const updateAgeAndCount = async(id, age) => {
    await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age });
    return count;
}

updateAgeAndCount('5e4a4072f9c264366102f447', 2).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
})