const mongoose = require('mongoose');

const MaterialItemSchema = new mongoose.Schema(
	{
		grammage: {
			type: Number,
			required: [true, 'Please provide material grammage'],
			min: [1, 'Material grammage cant be less than 1'],
		},
		thickness: {
			type: Number,
			required: [true, 'Please provide material thickness'],
			min: [1, 'Material thickness cant be less than 1'],
		},
		foldingSchemas: [String],
		availableProcessing: {
			type: [String],
			enum: ['pur', 'hotmelt', 'dispersion', 'sewn'],
			required: [true, `Atleast one processing must be added: "pur", "hotmelt", "dispersion", "sewn"`],
		},
		material: {
			type: mongoose.Schema.ObjectId,
			ref: 'Material',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const MaterialItem = mongoose.model('MaterialItem', MaterialItemSchema);
module.exports = MaterialItem;
