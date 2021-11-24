const mongoose = require('mongoose');

// force commit

const { Schema } = mongoose;

const FollowingSchema = new Schema({
    avatar_url: {
        type: String,
    },
    html_url: {
        type: String,
    },
    login: {
        type: String,
    }

});


module.exports = FollowingSchema;
