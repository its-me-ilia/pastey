const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Paste = new Schema({
    code: {
        type: Schema.Types.String
    },
    body: {
        type: Schema.Types.String,
        trim: false
    },
    title: {
        type: Schema.Types.String
    },
    visibility: {
        type: Schema.Types.Boolean
    },
    expires: {
        type: Schema.Types.Number
    }
},{
    collection: 'pasteys',
    timestamps: true
})

module.exports = Paste