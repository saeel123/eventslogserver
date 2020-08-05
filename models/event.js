const mongoose = require('mongoose')

const Event = mongoose.model('Event', {
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
    id: {
        type: String,
    },
    verb: {
        type: String,
    },
})

module.exports = Event