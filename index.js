'use strict'

var mongoose = require('mongoose');
var app = require('./app.js');
var port = process.env.PORT || 3678;


mongoose.connect('mongodb://localhost:27017/price-checker', (err, res) => {
  if(err){
    throw err;
  }else{
      console.log('Conexión a Mongo correcta');
      app.listen(port, () => {
        console.log(`API REST FAVORITOS funcionando en http://localhost:${port}`);
      });
  }
});
