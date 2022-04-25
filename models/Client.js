const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    surname: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    cpf: {
        type: Number,
        required: true
    },
    purchases: [
        {
            type: String,
        },
    ],
});

module.exports = mongoose.model('Client', clientSchema);