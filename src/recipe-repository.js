var db = require('./db.js');
var recipeObj = require('./recipe.js');


function addDocument(recipeItem) {
    recipeItem.save(function (err) {
        if (err) return console.error(err);
        console.log(recipeItem.name); // 'Silence'
        //fluffy.speak();
    });
}

//function addDocument(recipeItem){
//    var myCollection = db.getMyCollection();
//    myCollection.insert(recipeItem, function(err, result) {
//        if(err)
//            throw err;
//        console.log("entry saved");
//    });
//    console.log("After Insert")
//}

//function removeDocument(recipeItem){
//    var myCollection = db.getMyCollection();
//    myCollection.findAndModify(recipeItem, [], {remove:true}, function(err, object) {
//        if(err)
//            throw err;
//        console.log("document deleted");
//    });
//}

//function findDocument(recipeItem){
//    var myCollection = db.getMyCollection();
//    var cursor = myCollection.find(recipeItem);
//    cursor.each(function(err, doc) {
//        if(err)
//            throw err;
//        if(doc==null)
//            return;
//        //console.log("document find:");
//        //console.log(recipeItem);
//    });
//}

//function findRecipies (done) {
//    var myCollection = db.getMyCollection();
//    var cursor = myCollection.find( );
//    var recipies=[];
//    cursor.each(function(err, doc) {
//        if (doc != null) {
//            recipies.push(doc);
//        }
//        else{
//            done(recipies);
//        }
//    });
//};

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
//module.exports.findDocument = findDocument;
//module.exports.removeDocument = removeDocument;
module.exports.addDocument = addDocument;