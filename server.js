"use strict";
require('babel/register');
const express = require('express');
const recipeRepository = require('./src/recipe-repository.js');
const mongo = require('./src/mongo.js');
const db = require('./src/db.js');

const app = express();

app.use(express.static('./dist'));

app.get('/recipes', function (req, res) {
    recipeRepository.findAll(function(recipes){
        res.send(recipes);
    });
});


db.createConnection(function(){
    //mongo.saveDataInDatabase();
    //recipeRepository.findAll(function(recipes){
    //    console.log(recipes);
    //});
    app.listen(3000, function () {
        console.log('Create your recipy!');
    });

});


module.exports = app;
