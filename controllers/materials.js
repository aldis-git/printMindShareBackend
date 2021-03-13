const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async.js');
const Material = require('../models/Material.js');

// @desc	Get all materials
// @route	GET /api/v1/materials
// @access	Public
exports.getMaterials = asyncHandler(async (req, res, next) => {
	const materials = await Material.find();
	res.status(200).json({ success: true, count: materials.length, data: materials });
});

// @desc	Get single material
// @route	GET /api/v1/materials/:id
// @access	Public
exports.getMaterial = asyncHandler(async (req, res, next) => {
	const material = await Material.findById(req.params.id);

	if (!material) {
		return next(new ErrorResponse(`Material not found with id of ${req.params.id}`, 404));
	}

	res.status(200).json({ success: true, data: material });
});

// @desc	Create new material
// @route	POST /api/v1/materials
// @access	Private
exports.createMaterial = asyncHandler(async (req, res, next) => {
	console.log(req.body);
	const material = await Material.create(req.body);
	res.status(201).json({ success: true, data: material });
});

// @desc	Update material
// @route	PUT /api/v1/materials/:id
// @access	Private
exports.updateMaterial = asyncHandler(async (req, res, next) => {
	let material = await Material.findById(req.params.id);

	if (!material) {
		return next(new ErrorResponse(`Material not found with id of ${req.params.id}`, 404));
	}

	material = await Material.findOneAndUpdate(req.params.id, req.body, { new: true, rundValidators: true });
	res.status(200).json({ success: true, data: material });
});

// @desc	Delete single material
// @route	DELETE /api/v1/materials/:id
// @access	Private
exports.deleteMaterial = asyncHandler(async (req, res, next) => {
	const material = await Material.findById(req.params.id);

	if (!material) {
		return next(new ErrorResponse(`Material not found with id of ${req.params.id}`, 404));
	}
	material.remove();
	res.status(200).json({ success: true, data: {} });
});
