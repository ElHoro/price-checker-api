'use strict'

var Product = require('../models/product');
var Category = require('../models/category');

function prueba(req, res){

  if(req.params.nombre)
  {
    var nombre = req.params.nombre;
  }else{
    var nombre = 'Anónimo';
  }

  res.status(200).send({
    texto: "Hola mundo con NodeJs y EXPRESS - "+nombre});
}

function getProduct(req, res){
  var productId = req.params.id;

  Product.findById(productId)
  .populate('category')
  .exec((err, product) => {
    if(err){
      res.status(500).send({message: 'Error al devolver el producto'});
    }else{
      if(!product){
        res.status(404).send({message: 'No hay productos'});
      }else{
        res.status(200).send({product});
      }
    }
  });
}

function getProducts(req, res){
  Product.find({})
  .populate('category')
  .sort('name').exec((err, products) => {
    if(err){
      res.status(500).send({message: 'Error al devolver los productos'});
    }else{
      if(!products){
        res.status(404).send({message: 'No hay productos'});
      }else{
        res.status(200).send({products});
      }
    }
  });

}

function getProductsByCategory(req, res){
  Product.find({category: req.params.id})
  .sort('name').exec((err, products) => {
    if(err){
      res.status(500).send({message: 'Error al devolver los productos'});
    }else{
      if(!products){
        res.status(404).send({message: 'No hay productos'});
      }else{
        res.status(200).send({products});
      }
    }
  });
}

function saveProduct(req, res){
  var product = new Product();

  var params = req.body;

  product.name = params.name;
  product.category = params.category;
  product.price = params.price;

  product.save((err, storedProduct) => {
    if(err){
      res.status(500).send({message: 'Error al guardar el producto'});
    }else{
      res.status(200).send({product: storedProduct});
    }
  });
}

function updateProduct(req, res){
  var productId = req.params.id;
  var update = req.body;

  Product.findByIdAndUpdate(productId, update, (err, updatedProduct) => {
    if(err){
      res.status(500).send({message: 'Error al actualizar el producto'});
    }else{
      res.status(200).send({product: updatedProduct});
    }
  });
}

function deleteProduct(req, res){
  var productId = req.params.id;

  Product.findById(productId, (err, product) => {
    if(err){
      res.status(500).send({message: 'Error al devolver el producto'});
    }else{
      if(!product){
        res.status(404).send({message: 'No hay productos'});
      }else{
        product.remove(err => {
          if(err){
              res.status(500).send({message: 'El producto no pudo ser eliminado'});
          }else{
              res.status(200).send({message: 'El producto se ha eliminado'});
          }
        });
      }
    }
  });
}

function search(req, res){
  var searchPhrase = req.params.searchPhrase;

  console.log('buscando por: ' + searchPhrase);

  var buildResultSet = function(docs) {
    var result = [];
    for(var object in docs){
      result.push(docs[object]);
    }
    return result;
   }

  var regex = new RegExp(searchPhrase, 'i');
     var query = Product.find({name: regex}).sort({"name":-1}).limit(20);

        // Execute query in a callback and return users list
    query.exec(function(err, products) {
        if (!err) {
           // Method to construct the json result set
           var result = buildResultSet(products);
           res.send({products: result}, {
              'Content-Type': 'application/json'
           }, 200);
        } else {
           res.send(JSON.stringify(err), {
              'Content-Type': 'application/json'
           }, 404);
        }
     });
}


module.exports = {
  prueba,
  getProducts,
  getProduct,
  getProductsByCategory,
  saveProduct,
  updateProduct,
  deleteProduct,
  search
}
