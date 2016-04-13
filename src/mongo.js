var recipeObj = require('./recipe.js');
var recipeRepository = require('./recipe-repository.js');
var mongoose = require('mongoose');
var db = require('./db.js');

var text = '{"eggs":{"egg":"2", "milk":"100 ml", "tomato":"1", "cheese": "100 g.", "onion":"1/2"}, ' +
	'"pancakes":{"egg":"2", "milk":"100 ml", "flour":"100 g.", "chocolad": "100 g.", "water":"500 ml"}}';

//function saveDataInDatabase (){
//
//	var recipes = JSON.parse(text);
//	for (var recipe in recipes){
//		var recipeItem = new recipeObj.Recripe();
//		recipeItem.name = recipe;
//		for (var ingredient in recipes[recipe]){
//			var ingredientItem = new recipeObj.Ingrgedient();
//			ingredientItem.name = ingredient;
//			ingredientItem.amount = recipes[recipe][ingredient];
//			recipeItem.ingredients.push(ingredientItem);
//		}
//		console.log(recipeItem);
//		//recipeRepository.addDocument(recipeItem);
//		recipeRepository.findDocument(recipeItem);
//		//recipeRepository.removeDocument(recipeItem);
//		//recipeRepository.findRecipies();
//	}
//}


function saveDataInDatabase () {
	var recipeCollection = db.getRecipeCollection();
	var ingred = new recipeObj.Ingrgedient("beef", 300);
	console.log("before save" + ingred.name);
	var Recipe = mongoose.model('BeefRecipe', recipeCollection);
	var steak = new Recipe({name: "beef", ingredients: [ingred]});
	console.log("before save" + steak.ingredients[0].name); // 'Silence'
	recipeRepository.addDocument(steak);
}

module.exports.saveDataInDatabase = saveDataInDatabase;