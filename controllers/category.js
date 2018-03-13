'use strict'

var Category = require('../models/category');

function getCategory(req, res){
  var categoryId = req.params.id;

  Category.findById(categoryId, (err, category) => {
    if(err){
      res.status(500).send({message: 'Error al devolver el categoria'});
    }else{
      if(!category){
        res.status(404).send({message: 'No hay categorias'});
      }else{
        res.status(200).send({category});
      }
    }
  });
}

function getCategories(req, res){
  Category.find({}).sort('name').exec((err, categories) => {
    if(err){
      res.status(500).send({message: 'Error al devolver los categorias'});
    }else{
      if(!categories){
        res.status(404).send({message: 'No hay categorias'});
      }else{
        res.status(200).send({categories});
      }
    }
  });

}

function saveCategory(req, res){
  var category = new Category();

  var params = req.body;

  category.name = params.name;

  category.save((err, storedCategory) => {
    if(err){
      res.status(500).send({message: 'Error al guardar el categoria'});
    }else{
      res.status(200).send({category: storedCategory});
    }
  });
}

function updateCategory(req, res){
  var categoryId = req.params.id;
  var update = req.body;

  Category.findByIdAndUpdate(categoryId, update, (err, updatedCategory) => {
    if(err){
      res.status(500).send({message: 'Error al actualizar el categoria'});
    }else{
      res.status(200).send({category: updatedCategory});
    }
  });
}

function deleteCategory(req, res){
  var categoryId = req.params.id;

  Category.findById(categoryId, (err, category) => {
    if(err){
      res.status(500).send({message: 'Error al devolver el categoria'});
    }else{
      if(!category){
        res.status(404).send({message: 'No hay categorias'});
      }else{
        category.remove(err => {
          if(err){
              res.status(500).send({message: 'El categoria no pudo ser eliminado'});
          }else{
              res.status(200).send({message: 'El categoria se ha eliminado'});
          }
        });
      }
    }
  });
}


module.exports = {
  getCategories,
  getCategory,
  saveCategory,
  updateCategory,
  deleteCategory
}
