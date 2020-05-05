const mongoose = require('mongoose');

const searchSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
});

module.exports = mongoose.model('Search', searchSchema);