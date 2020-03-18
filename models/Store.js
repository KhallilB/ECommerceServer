const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  products: {
    type: [Schema.Types.ObjectId],
    ref: 'Products'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Store', StoreSchema);
