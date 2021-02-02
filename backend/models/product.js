const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = Schema({
     name: { type: String, required: true},
     category: { type: String, required: true},
     location: {type: String, required: true},
     price: { type: Number, required: true},
     dateCreated: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Product', productSchema);