const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3002;
const CultRouter = require('./Route/Culture');
const StatRouter = require('./Route/Stats');
app.use(bodyParser.json());

// Utilisation du middleware CORS
app.use(cors());

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Agricole', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connecté à la base de données MongoDB');
}).catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1);
});
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/cultures', CultRouter);
app.use('/Stats',StatRouter);
module.exports = app;

// // Route pour afficher toutes les cultures
// app.get('/cultures', async (req, res) => {
//     try {
//         const cultures = await Culture.find();
//         res.json(cultures);
//     } catch (error) {
//         console.error('Erreur lors de la récupération des cultures :', error);
//         res.status(500).send('Erreur serveur');
//     }
// });

// // Route pour ajouter une nouvelle culture
// // Route pour ajouter une nouvelle culture
// app.post('/cultures', async (req, res) => {
//     try {
//         console.log('Données reçues :', req.body); // Ajoutez cette ligne pour voir les données reçues
//         const nouvelleCulture = new Culture(req.body);
//         const cultureEnregistree = await nouvelleCulture.save();
//         res.status(201).json(cultureEnregistree);
//     } catch (error) {
//         console.error('Erreur lors de l\'ajout de la culture :', error);
//         res.status(500).send('Erreur serveur');
//     }
// });

// app.delete('/cultures/:id', async (req, res) => {
//     const id = req.params.id;

//     try {
//         const cultureSupprimee = await Culture.findByIdAndDelete(id);

//         if (cultureSupprimee) {
//             res.json({ message: 'Culture supprimée avec succès.' });
//         } else {
//             res.status(404).json({ message: 'Culture non trouvée.' });
//         }
//     } catch (error) {
//         console.error('Erreur lors de la suppression de la culture :', error);
//         res.status(500).send('Erreur serveur');
//     }
// });
// app.put('/cultures/:id', async (req, res) => {
//     const id = req.params.id;

//     try {
//         console.log('Données reçues pour la mise à jour :', req.body);

//         const cultureMiseAJour = await Culture.findByIdAndUpdate(
//             id,
//             req.body,
//             { new: true }
//         );

//         if (cultureMiseAJour) {
//             res.json({ message: 'Culture mise à jour avec succès.', culture: cultureMiseAJour });
//         } else {
//             res.status(404).json({ message: 'Culture non trouvée.' });
//         }
//     } catch (error) {
//         console.error('Erreur lors de la mise à jour de la culture :', error);
//         res.status(500).send('Erreur serveur');
//     }
// });



// app.listen(PORT, () => {
//     console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
// });
