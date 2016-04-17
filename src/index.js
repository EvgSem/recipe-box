"use strict";
require('babel/register');
const express = require('express');
const recipeRepository = require('./recipe-repository.js');
const recipe = require('./recipe.js');
const mongo = require('./mongo.js');
var bodyParser = require('body-parser');
const db = require('./db.js');
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
