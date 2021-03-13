const mongoose = require('mongoose');

const PalletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Provide name'],
    unique: true,
  },
  width: {
    type: Number,
    required: [true, 'Provide width'],
  },
  length: {
    type: Number,
    required: [true, 'Provide length'],
  },
  height: {
    type: Number,
    required: [true, 'Provide height'],
  },
  packagingHeight: {
    type: Number,
    required: [true, 'Provide max packaging height'],
  },
  packagingWeight: {
    type: Number,
    required: [true, 'Provide max packaging weight'],
  },
});

const Pallet = mongoose.model('Pallet', PalletSchema);
module.exports = Pallet;
