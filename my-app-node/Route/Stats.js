const express = require('express');
const router = express.Router();

const StatController = require('../Controllers/Stats')

router.get('/', StatController.all);
router.post('/', StatController.create);
module.exports = router;