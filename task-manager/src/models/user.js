const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain ')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positibe number');
            }
        }
    }
})

// Regular funciton needed here cause of binding (Arrow function X)
userSchema.pre('save', async function(next) {
    console.log(this)
    const user = this;

    console.log(this);
    console.log('just before saving!')

    next(); // Call it when it's done
});

const User = mongoose.model('User', userSchema);

module.exports = User;