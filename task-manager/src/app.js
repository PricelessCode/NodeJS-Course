const express = require('express');
require('./db/mongoose'); // To make the database run (to connect)
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

// This will automatically parse incoming json file from the client-side
app.use(express.json());

// Separating router files
app.use(userRouter);
app.use(taskRouter)

module.exports = app