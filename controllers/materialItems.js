const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async.js');
const MaterialItem = require('../models/MaterialItem.js');
const Material = require('../models/Material.js');

// @desc	Get material items
// @route	GET /api/v1/material-items
// @route	GET /api/v1/materials/:materialId/item
// @access	Public/Private
exports.getMaterialItems = asyncHandler(async (req, res, next) => {
	// Ja ejam pa routi "/api/v1/materials/:materialId/item" un gribam
	// dabūt konkrēta materiāla itemus:
	if (req.params.materialId) {
		// Pārbaudam vai tāds materiāls eksistē
		const material = await Material.findById(req.params.materialId);
		if (!material) {
			return next(new ErrorResponse(`Material not found with id of ${req.params.materialId}`));
		}
		// Ja materiāls eksistē, atrodam itemus kuriem ir "material: materiālaId kuru meklējam"
		const items = await MaterialItem.find({ material: req.params.materialId }).sort('grammage');
		res.status(200).json({ success: true, count: items.length, data: items });
	} else {
		// Ja ejam pa routi "/api/v1/material-items" atrodam visu materiālu itemus.
		const items = await MaterialItem.find();
		res.status(200).json({ success: true, count: items.length, data: items });
	}
});

// @desc	Create new material item
// @route	POST /api/v1/materials/:materialId/item
// @access	Public/Private
exports.createMaterialItem = asyncHandler(async (req, res, next) => {
	// Pievienojam requesta bodijam parametru "material" ar materiāla ID
	console.log(req.body);
	req.body.material = req.params.materialId;

	// Pārbaudam vai tāds materiāls vispār eksistē
	const material = await Material.findById(req.params.materialId);

	if (!material) {
		return next(new ErrorResponse(`Material not found with id of ${req.params.materialId}`));
	}

	// Ja materiāls eksistē, pārbaudam vai šī materiāla itemiem jau nav šāda gramāža kuru mēģinam uztaisīt.
	const grammageAlreadyExists = await MaterialItem.findOne({
		$and: [{ material: req.params.materialId }, { grammage: req.body.grammage }],
	});

	if (grammageAlreadyExists) {
		return next(new ErrorResponse(`Material already got this grammage`, 400));
	} else {
		// Ja neeksistē, izveidojam tam materiāla itemu.
		const materialItem = await MaterialItem.create(req.body);
		res.status(200).json({ success: true, data: materialItem });
	}
});

// @desc	Update material item
// @route	PUT /api/v1/material-items/:id
// @access	Public/Private
exports.updateMaterialItem = asyncHandler(async (req, res, next) => {
	let item = await MaterialItem.findById(req.params.id);

	if (!item) {
		return next(new ErrorResponse(`Material item not found with id of ${req.params.id}`, 404));
	}
	item = await MaterialItem.findOneAndUpdate({ _id: req.params.id }, req.body, {
		runValidators: true,
		new: true,
	});
	res.status(200).json({ success: true, data: item });
});

// @desc	Delete material item
// @route	DELETE /api/v1/material-items/:id
// @access	Public/Private
exports.deleteMaterialItem = asyncHandler(async (req, res, next) => {
	const item = await MaterialItem.findById(req.params.id);

	if (!item) {
		return next(new ErrorResponse(`Material item not found with id of ${req.params.id}`, 404));
	}
	item.remove();
	res.status(200).json({ success: true, data: {} });
});
