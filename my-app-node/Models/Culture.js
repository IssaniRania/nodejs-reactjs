
const mongoose = require('mongoose');

const cultureSchema = new mongoose.Schema({
    nom: String,
    description: String,
    date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Culture', cultureSchema);