// CRUD (Create Read Update Delete)

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    // db.collection('users').findOne({ name: 'Jen', age: 1 }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(user)
    // });

    // db.collection('users').find({ age: 21 }).toArray((error, users) => {
    //     console.log(users)
    // });

    // db.collection('users').find({ age: 21 }).count((error, count) => {
    //     console.log(count)
    // });
});