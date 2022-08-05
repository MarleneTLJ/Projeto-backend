const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    workload: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Course', courseSchema);