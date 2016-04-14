var recipeCollection;
var Recipe;
var express = require('express');
var app = express();
var recipeObj = require('./recipe.js');
var mongoose = require('mongoose');

app.use(express.static('./'));

function createConnection(onCreate){
    mongoose.connect('mongodb://localhost/recipe-box');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("connected to the mongodb");
    });

    recipeCollection = mongoose.Schema({
        name:    String,
        ingredients: [mongoose.Schema.Types.Mixed]
    }, { collection: 'recipes' });

    Recipe = mongoose.model('Recipe', recipeCollection);

    onCreate();
};

function getRecipeCollection() {
    return recipeCollection;
}

function getRecipeModel() {
    return Recipe;
}

module.exports.createConnection = createConnection;
module.exports.getRecipeCollection = getRecipeCollection;
module.exports.getRecipeModel = getRecipeModel;