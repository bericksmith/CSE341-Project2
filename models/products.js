const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  added: { type: Date, required: true },
  updated: { type: Date },
  location: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
