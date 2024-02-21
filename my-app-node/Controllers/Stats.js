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
  //notification
  io.on('connection', (socket) => {
    console.log('Client connecté');
  
    socket.on('disconnect', () => {
      console.log('Client déconnecté');
    });
  });
  
  // Fonction pour vérifier et envoyer des notifications
  function checkAndNotify(value) {
    const VALEUR_MINIMALE = 10
  
    // Vérifiez si la valeur est inférieure à la valeur minimale souhaitée
    if (value < VALEUR_MINIMALE) {
      io.emit('notification', { message: 'La valeur minimale a été atteinte !' });
    }
  }