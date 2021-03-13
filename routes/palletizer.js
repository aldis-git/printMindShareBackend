const express = require('express');
const router = express.Router();
const { createPallet, getPallets, calculateRowsOnPallet } = require('../controllers/palletizer.js');

// Import route protector
const { protect, authorize } = require('../middleware/authentication.js');

module.exports = router;

router.route('/').post(protect, createPallet).get(getPallets);

router.route('/calculate').post(protect, authorize('owner'), calculateRowsOnPallet);
