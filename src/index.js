import {recipeSchema, recipeModel, Recipe, Ingrgedient} from './recipe.js';
import {createConnection} from './db.js';
import express from 'express';
import mongoose from 'mongoose';
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static('./dist'));

app.get('/recipes', function (req, res) {
    let recipes=[];
    let promise = new Promise(function(resolve) {
        recipeModel.find({}, function (err, recipeSchema) {
            recipeSchema.forEach(function (recipe) {
                recipes.push(recipe);
            });
            resolve(recipes);
        });
    });
    promise.then(function(recipes){
        res.send(recipes);
    });
});

app.post('/addRecipe', function (req, res) {
    let Recipe = mongoose.model('Recipe', recipeSchema);
    let newRecipe = new Recipe({name: req.body.name, ingredients: []});
    newRecipe.save(function (err) {
        if (err) return console.error(err);
    });
    res.status(200);
});

app.post('/editRecipe', function (req, res) {
    let recipeId = req.param('id');
    let recipeName = req.param('name');
    let promise = new Promise(function(resolve) {
        recipeModel.findById(recipeId, function (err, recipe) {
            recipe.name = recipeName;
            recipe.save(function (err) {
                if (err) return console.error(err);
            });
            resolve(recipe);
        });
    });
    promise.then(function(result){
        res.send(result);
    });
});

app.get('/deleteRecipe', function (req, res) {
    let recipeId = req.param('id');
    let recipeName='';
    let promise = new Promise(function(resolve) {
        recipeModel.findById(recipeId, function (err, recipe) {
            recipeName = recipe.name;
            recipe.remove();
            resolve("Recipe "+ recipeName +" was deleted");
        });
    });
    promise.then(function(result){
        res.send(result);
    });
});

app.get('/recipe', function(req, res) {
    let recipeId = req.param('id');
    let promise = new Promise(function(resolve) {
        recipeModel.find({'_id': recipeId}, function (err, docs) {
            resolve(docs[0]);
        });
    });
    promise.then(function(result){
        res.send(result);
    });
});

createConnection(function(){
    app.listen(3000, function () {
        console.log('server started');
    });
});

module.exports = app;
