const jwt = require('jsonwebtoken')
const User = require('../models/user');

// Express Middleware
// Without middleware --> run route handler
// With middleware: new request -> do something -> run route handler
const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // secret string has to be the same with the string used when creating token.
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) // String used for the key cause special character is used.

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user;
        next(); // Router will get called
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }


};

module.exports = auth