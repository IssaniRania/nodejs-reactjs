const Stats = require('./../Models/Stats');
exports.create = (req, res) => {
    const { label, value } = req.body;
  
    const newStats = new Stats({
        label,
        value,
    });
  
    newStats.save()
      .then(savedStats => res.status(200).json(savedStats))
      .catch(err => res.status(400).json({ error: err.message }));
  };
  exports.all = (req, res) => {
    Stats.find()
      .then(stats => res.status(200).json(stats))
      .catch(err => res.status(400).json({ error: err.message }));
  };