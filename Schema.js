const mongoose = require('mongoose');

// Define the MenuItem schema
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Name is required
  description: { type: String },           // Description is optional
  price: { type: Number, required: true }  // Price is required
});

// Create the model
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;