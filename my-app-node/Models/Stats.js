const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema ({
    label: String,
    value: Number,
  });

const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;
