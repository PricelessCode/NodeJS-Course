const express = require('express');
require('./db/mongoose'); // To make the database run (to connect)
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000;

// This will automatically parse incoming json file from the client-side
app.use(express.json());

// Separating router files
app.use(userRouter);
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
});

const bcrypt = require('bcryptjs');

const myFunction = async() => {
    const password = 'Red12345!'
    const hashedPassword = await bcrypt.hash(password, 8);

    console.log(password);
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
    console.log(isMatch);
}

myFunction();