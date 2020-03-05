const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Task = require('./task')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
}, {
    timestamps: true
});

// Virtuals are not actually stored in the database this is just for mongoose
// to figure out how things are related
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});

// When sending json back to the client, it automatically calls .toJSON if it has it. and then it calls JSON.toStringify()
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject() // toObject for clearning metadata
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'secret')
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

// findByCredentials --> you can name it how you want
userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw Error('Unable to Login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw Error('Unable to Login');
    }

    return user;
}

// This is Moongoose Middleware
// Hash the plain text password before saving
// Regular funciton needed here cause of binding (Arrow function X)
userSchema.pre('save', async function(next) {
    const user = this;

    // password hashing when creating new user or updating new user.
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next(); // Call it when it's done
});

// Delete related tasks when user is removed
userSchema.pre('remove', async function(next) {
    const user = this;
    const tasks = user.populate('tasks').execPopulate();
    await Task.deleteMany({ owner: user._id });
    next();
})


const User = mongoose.model('User', userSchema);

module.exports = User;