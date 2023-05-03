const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  saleDate: {
    type: Date,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  storeLocation: {
    type: String,
    required: true
  },
  customer: {
    type: Object,
    required: true
  },
  couponUsed: {
    type: Boolean,
    required: true
  },
  purchaseMethod: {
    type: String,
    required: true
  }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
