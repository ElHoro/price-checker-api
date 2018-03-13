'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category = require('../models/category');

var ProductSchema = Schema({
  name: String,
  category: String,
  price: String,
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category'
  }
});

ProductSchema.index({'name': 'text', 'category.name': 'text'});

module.exports = mongoose.model('Product', ProductSchema);
