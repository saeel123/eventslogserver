const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    subject: {
        type: String,
    },
    message: {
        type: String,
    },
    author: {
        type: String,
    },
    event_created_at: {
        type: Date,
    },
    event_id: {
        type: String,
    },
    verb: {
        type: String,
    },
}, {
    timestamps: true
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event