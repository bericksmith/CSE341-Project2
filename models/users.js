const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, required: true, default: 'active' },
  dob: { type: Date, required: true },
  location: { type: String, required: true }
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;