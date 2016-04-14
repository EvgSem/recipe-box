var db = require('./db.js');

function addDocument(recipeItem) {
    recipeItem.save(function (err) {
        if (err) return console.error(err);
    });
}

function findAll(done){
    var recipeModel = db.getRecipeModel();
    var recipesCollection = db.getRecipeCollection();

    var recipes=[];
    var promise = new Promise(function(resolve) {
        recipeModel.find({}, function (err, recipesCollection) {
            recipesCollection.forEach(function (recipe) {
                recipes.push(recipe);
            });
            resolve(recipes);
        });
    });
    promise.then(function(recipes){done(recipes);});
}

module.exports.findAll = findAll;
module.exports.addDocument = addDocument;