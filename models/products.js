const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
  added: { type: Date, default: Date.now },  
  updated: { type: Date },
  location: { type: String, required: true }
}, { versionKey: false });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
