const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    unique: true,
    required: true
  }
});

modules.export = mongoose.model('Product', ProductSchema);
