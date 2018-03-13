'use strict'

var express = require('express');
var CategoryController = require('../controllers/category');
var api = express.Router();

api.get('/category/:id', CategoryController.getCategory);
api.post('/category', CategoryController.saveCategory);
api.put('/category/:id', CategoryController.updateCategory);
api.delete('/category/:id', CategoryController.deleteCategory);
api.get('/categories', CategoryController.getCategories);

module.exports = api;
