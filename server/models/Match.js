const mongoose = require('mongoose');

const { Schema } = mongoose;

const matchSchema = new Schema({
    requester: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    requestee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    
    matchState: {
        type: String,
        enum: ['requestSent', 'requestDeclined', 'requestAccepted'],
        default: 'requestSent'
    }
});

// .index( { <field1>: <type>, <field2>: <type2>, ... } ) - field is the field name, type is either 1 or -1:
// A value of 1 specifies an index that orders items in ascending order. A value of -1 specifies an index that orders items in descending order.
// https://docs.mongodb.com/manual/core/index-compound/
matchSchema.index({ 'requester': 1, 'requestee': 1 }, { unique: true });

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
