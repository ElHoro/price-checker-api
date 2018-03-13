'use strict'

var express = require('express');
var ProductController = require('../controllers/product');
var api = express.Router();

api.get('/prueba/:nombre?', ProductController.prueba);
api.get('/product/:id', ProductController.getProduct);
api.post('/product', ProductController.saveProduct);
api.put('/product/:id', ProductController.updateProduct);
api.delete('/product/:id', ProductController.deleteProduct);
api.get('/products', ProductController.getProducts);
api.get('/products/category/:id', ProductController.getProductsByCategory);
api.get('/products/search/:searchPhrase', ProductController.search);

module.exports = api;
