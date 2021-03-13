const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async.js');
const { calculateRows } = require('../middleware/palletizerLogic');

const Pallet = require('../models/Pallet.js');

// @desc	Get all pallets
// @route	GET /api/v1/palletizer
// @access	Public
exports.getPallets = asyncHandler(async (req, res, next) => {
  const pallets = await Pallet.find();
  res.status(200).json({ success: true, count: pallets.length, data: pallets });
});

// @desc	Create new pallet
// @route	POST /api/v1/palletizer
// @access	Private
exports.createPallet = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const pallet = await Pallet.create(req.body);
  res.status(201).json({ success: true, data: pallet });
});

// @desc	Calculate products on pallet row
// @route	GET /api/v1/palletizer/calculate
// @access	Public
exports.calculateRowsOnPallet = asyncHandler(async (req, res, next) => {
  //console.log(req.body);
  const pallet = req.body.pallet;
  const product = req.body.product;

  const response = calculateRows(pallet, product);

  res.status(200).json({ success: true, data: response });
});
