const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  saleDate: {
    type: Date,
    required: true
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;