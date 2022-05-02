const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    sleep: [{asleepTime: String, wakeupTime: String}]
})

module.exports = mongoose.model('Data', dataSchema)
