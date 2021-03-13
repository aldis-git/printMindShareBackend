const express = require('express');
const {
	getMaterialItems,
	createMaterialItem,
	updateMaterialItem,
	deleteMaterialItem,
} = require('../controllers/materialItems.js');

const router = express.Router({ mergeParams: true });

// Import route protector
const { protect, authorize } = require('../middleware/authentication.js');

router.route('/').get(getMaterialItems).post(protect, authorize('admin', 'owner'), createMaterialItem);

router
	.route('/:id')
	.put(protect, authorize('admin', 'owner'), updateMaterialItem)
	.delete(protect, authorize('owner'), deleteMaterialItem);

module.exports = router;
