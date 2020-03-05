const express = require('express');
const User = require('../models/user')
const auth = require('../middleware/auth');
const router = new express.Router();

// Async and await can make codes work like synchronous when it's actually asynchronous.
// Synchronous --> You make that code finish before any next codes
// Async and await code shortens the code more than when using Promises.
router.post('/users', async(req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({
            user,
            token
        });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async(req, res) => {
    try {
        // findbyCredentials -> My Custom function
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken(); // generateAuthToken --> My Custom function
        res.send({ user, token }); //getPublicProfile() --> My Custom function
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((item) => {
            item.token !== req.token;
        });
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save();
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// auth added to the parameter for this route. --> Using middleware
router.get('/users/me', auth, async(req, res) => {
    console.log(req)
    res.send(req.user);
});

router.patch('/users/me', auth, async(req, res) => {
    const requestedKeys = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = requestedKeys.every((property) => allowedUpdates.includes(property))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        requestedKeys.forEach((update) => req.user[update] = req.body[update])
        await req.user.save();
        res.send(req.user); // This automatically sends status code 200 as well
    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/users/me', auth, async(req, res) => {
    try {
        await req.user.remove()
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
})


module.exports = router;