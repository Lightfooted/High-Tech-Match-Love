const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const { Schema } = mongoose;

const oneToOneChatSchema = new Schema({
    messageAuthor:
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messageRecipient:
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chatText: {
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

const OneToOneChat = mongoose.model('OneToOneChat', oneToOneChatSchema);

module.exports = OneToOneChat;


// db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )
// db.musicians.find( ).sort( { name: 1 } ) 1 is ascending, -1 is descending

// We need to be able to retrieve a list of users with whom a given user has chats available
// We need to be able to retrieve a chat between two specific users
