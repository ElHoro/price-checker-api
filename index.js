'use strict'

var mongoose = require('mongoose');
var app = require('./app.js');
var port = process.env.PORT || 3678;
var mongodb_uri = process.env.MONGODB_URI;

mongoose.connect(mongodb_uri, (err, res) => {
  if(err){
    throw err;
  }else{
      console.log('Conexión a Mongo correcta');
      app.listen(port, () => {
        console.log(`API REST FAVORITOS funcionando en el puerto :${port}`);
      });
  }
});
