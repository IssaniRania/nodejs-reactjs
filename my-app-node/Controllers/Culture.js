const Culture = require('./../Models/Culture');
// get all Culture
exports.all = (req, res) => {
    Culture.find()
      .then(Cultures => res.status(200).json(Cultures))
      .catch(err => res.status(400).json({error: err.message}));
  };
// Créer une nouvelle culture
exports.create = (req, res) => {
  // Extraire les données du corps de la requête
  const { nom, description, date } = req.body;

  // Créer une nouvelle instance de la culture
  const nouvelleCulture = new Culture({
    nom: nom,
    description: description,
    date: date
  });

  nouvelleCulture.save()
    .then(Cultures => {
      res.status(201).json({ message: 'Culture créée avec succès', culture: Cultures });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};
//modifier 
exports.update = (req, res, next) => {
    Culture.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({success : true, message: ' Modifier !'}))
      .catch(error => res.status(400).json({ error }));
  };
  // Supprimer
exports.delete = (req, res, next) => {
        Culture.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({success : true, message: 'Supprimer !'}))
      .catch(error => res.status(400).json({ error }));
  };