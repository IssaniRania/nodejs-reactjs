const express = require('express');
const router = express.Router();

const CultController = require('../Controllers/Culture')

router.get('/', CultController.all);
router.post('/',CultController.create);
router.delete('/:id',CultController.delete);
router.put('/:id', CultController.update);


module.exports = router;