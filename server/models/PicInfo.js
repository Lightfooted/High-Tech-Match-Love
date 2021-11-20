const mongoose = require('mongoose');

const { Schema } = mongoose;

const picSchema = new Schema({
    url: {
        type: String,
        required: true
    },

});

module.exports = picSchema;
