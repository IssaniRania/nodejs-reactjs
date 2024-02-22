const Stats = require('./../Models/Stats');
//const io = require('../config/socket'); // Ajoutez le chemin correct
// const io = require("socket.io");
const socketIo = require("socket.io");
const io = socketIo();
//const io = socketIo.listen(3002);
// io.on('connection', (socket) => {
//   console.log('Un client s\'est connecté');
  
//   // Gère d'autres événements ou actions nécessaires ici
// });
exports.create = (req, res) => {
  const { label, value } = req.body;

  const newStats = new Stats({
    label,
    value,
  });

  newStats.save()
    .then(savedStats => {
      io.emit('statsUpdated', savedStats);

      // Logique pour la notification
      if (label === 'Monday' && value < 10) {
        const notification = { message: 'La valeur minimale à la première journée a été atteinte !' };
        io.emit('notification', notification);
      }

      res.status(200).json(savedStats);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};

// exports.create = (req, res) => {
//   const { label, value } = req.body;

//   const newStats = new Stats({
//     label,
//     value,
//   });

//   newStats.save()
//     .then(savedStats => {
//       io.emit('statsUpdated', savedStats);

//       // Logique pour la notification
//       if (label === 'Monday' && value < 10) {
//         io.emit('notification', { message: 'La valeur minimale à la première journée a été atteinte !' });
//       }

//       res.status(200).json(savedStats);
//     })
//     .catch(err => {
//       res.status(400).json({ error: err.message });
//     });
// };


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
