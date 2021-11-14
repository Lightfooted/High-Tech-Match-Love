const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    userName: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    location: {
        type: String,
        required: false
    },

    bio: {
        type: String,
        required: false
    },

    password: {
        type: String,
        required: true,
        minlength: 5
    },

    rightSwipes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    githubLink: {
        type: String,
        required: false
    },

    profilePicUrl: {
        type: String,
        required: false
    }
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
        if (this.isNew || this.isModified('password')) {
            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
    
        next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
