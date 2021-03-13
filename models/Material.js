const mongoose = require('mongoose');
const slugify = require('slugify');

const MaterialSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'Please add a name'],
			unique: true,
		},
		slug: {
			type: String,
			required: false,
		},
		type: {
			type: String,
			required: [true, `Type needs to be one of these options: 'paper', 'board', 'plastic', 'cloth', 'leather'`],
			enum: ['paper', 'board', 'plastic', 'cloth', 'leather'],
		},
		coating: {
			type: String,
			required: [true, `Coating needs to be one of these options: 'coated', 'uncoated', 'undefined'`],
			enum: ['coated', 'uncoated', 'undefined'],
		},
		category: {
			type: String,
			required: false,
			default: 'not specified',
		},
		description: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

// Create material slug from the name
MaterialSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

// Cascade delete material items when a material is deleted
MaterialSchema.pre('remove', async function (next) {
	console.log(`Material items being removed from material ${this._id}`);
	await this.model('MaterialItem').deleteMany({ material: this._id });
	next();
});

const Material = mongoose.model('Material', MaterialSchema);
module.exports = Material;
