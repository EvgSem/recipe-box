//var MongoClient = require('mongodb').MongoClient;
var myCollection;
var recipeCollection;
var Recipe;
var express = require('express');
var app = express();

app.use(express.static('./'));

var recipeObj = require('./recipe.js');

// getting-started.js
var mongoose = require('mongoose');

function createConnection(onCreate){
    mongoose.connect('mongodb://localhost/recipe-box');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("connected to the mongoDB !!!!");
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


//function createConnection(onCreate){
//    MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
//        if(err)
//            throw err;
//        console.log("connected to the mongoDB !");
//        myCollection = db.collection('recipies');
//        onCreate();
//    });
//}

//function getMyCollection() {
//    return myCollection;
//}


module.exports.createConnection = createConnection;
module.exports.getRecipeCollection = getRecipeCollection;
module.exports.getRecipeModel = getRecipeModel;