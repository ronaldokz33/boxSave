const mongoose = require('mongoose');

const file = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
}, {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });

file.virtual('url').get(function () {
    return `http://localhost:3366/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model('file', file);