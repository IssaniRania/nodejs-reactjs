const Stats = require('./../Models/Stats');
//const io = require('../config/socket'); // Ajoutez le chemin correct
const io = require("socket.io");

exports.create = (req, res) => {
  const { label, value } = req.body;

  const newStats = new Stats({
    label,
    value,
  });

  newStats.save()
    .then(savedStats => {
      io.emit('statsUpdated', savedStats); // Émettez l'événement pour mettre à jour la courbe

      // Vérifiez si la valeur est minimale à la première journée
      if (label === 'Monday' && value < 5) {
        io.emit('notification', { message: 'La valeur minimale à la première journée a été atteinte !' });
      }

      res.status(200).json(savedStats);
    })
    .catch(err => res.status(400).json({ error: err.message }));
};

exports.all = (req, res) => {
  Stats.find()
    .then(stats => res.status(200).json(stats))
    .catch(err => res.status(400).json({ error: err.message }));
};
// exports.create = (req, res) => {
//     const { label, value } = req.body;
  
//     const newStats = new Stats({
//         label,
//         value,
//     });
  
//     newStats.save()
//       .then(savedStats => res.status(200).json(savedStats))
//       .catch(err => res.status(400).json({ error: err.message }));
//   };
//   exports.all = (req, res) => {
//     Stats.find()
//       .then(stats => res.status(200).json(stats))
//       .catch(err => res.status(400).json({ error: err.message }));
//   };
