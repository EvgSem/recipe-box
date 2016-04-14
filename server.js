"use strict";
require('babel/register');
const express = require('express');
const recipeRepository = require('./src/recipe-repository.js');
const recipe = require('./src/recipe.js');
const mongo = require('./src/mongo.js');
var bodyParser = require('body-parser');
const db = require('./src/db.js');
var mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static('./dist'));

app.get('/recipes', function (req, res) {
    recipeRepository.findAll(function(recipes){
        res.send(recipes);
    });
});

app.post('/addRecipe', function (req, res) {
    var recipeCollection = db.getRecipeCollection();
    var Recipe = mongoose.model('BeefRecipe', recipeCollection);
    var newRecipe = new Recipe({name: req.body.name, ingredients: []});
    recipeRepository.addDocument(newRecipe);
    res.status(200);
});


db.createConnection(function(){
    mongo.saveDataInDatabase();
    //recipeRepository.findAll(function(recipes){
    //    console.log(recipes);
    //});
    app.listen(3000, function () {
        console.log('server started');
    });
});

module.exports = app;
