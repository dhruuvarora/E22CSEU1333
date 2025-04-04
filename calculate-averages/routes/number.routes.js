// routes/numbers.js
const express = require('express');
const router = express.Router();
const numbersController = require('../controllers/number.controller');

// Route to handle number type requests
router.get('/:numberid', numbersController.getNumbersByType);

module.exports = router;