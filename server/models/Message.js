const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const { Schema } = mongoose;

const messageSchema = new Schema({
    author:
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient:
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;