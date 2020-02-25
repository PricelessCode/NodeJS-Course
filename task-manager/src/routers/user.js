const express = require('express');
const User = require('../models/user')
const router = new express.Router();

// Async and await can make codes work like synchronous when it's actually asynchronous.
// Synchronous --> You make that code finish before any next codes
// Async and await code shortens the code more than when using Promises.
router.post('/users', async(req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch {
        res.status(400).send(e);
    }
});

router.get('/users', async(req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send()
    }
});

router.get('/users/:id', async(req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send()
    }
});

router.patch('/users/:id', async(req, res) => {
    const requestedKeys = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = requestedKeys.every((property) => allowedUpdates.includes(property))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send();
        }

        res.send(user); // This automatically sends status code 200 as well
    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
})


module.exports = router;