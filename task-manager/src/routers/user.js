const express = require('express');
const User = require('../models/user')
const auth = require('../middleware/auth');
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account') // ES6 object destructuring
const sharp = require('sharp')
const multer = require('multer');
const router = new express.Router();

// Async and await can make codes work like synchronous when it's actually asynchronous.
// Synchronous --> You make that code finish before any next codes
// Async and await code shortens the code more than when using Promises.
router.post('/users', async(req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name); // This is asynchronus but we don't have to use 'await' since the email doesn't have to be sent before other process below
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
        await req.user.remove();

        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
})

// Profile image file settings
const upload = multer({
    // dest: 'avatars', --> This code used to make us save files in that folder.
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true);

    }
});

// Set Profile image
router.post('/users/me/avatar', auth, upload.single('photoFile'), async(req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save();
    res.send();
}, (error, req, res, next) => { // This function prevents user seeing HTML error codes when an error occurs in the upload.single('sentFile') middleware
    res.status(400).send({
        error: error.message
    });
})

// Delete Profile Image
router.delete('/users/me/avatar', auth, async(req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    sendCancelationEmail(req.user.email, req.user.name)
    res.send();
});

// Serving user profile image --> This can also be used public --> That's why we use id instead of auth
router.get('/users/:id/avatar', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png') // --> To let the browser know we are sending image file so that it should open as an image
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send();
    }
})

module.exports = router;