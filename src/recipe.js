"use strict";
require('babel/register');

class Ingrgedient {
    constructor(name, account){
        this.name = name;
        this.amount = account;
    }
};

class Recipe {
    constructor() {
        this.name = '';
        this.ingredients = []
    }
    addIngredient(name, account){
        let ingredient= new Ingrgedient(name, account);
        this.ingredients.push(ingredient);
    }
};

module.exports.Ingrgedient = Ingrgedient;
module.exports.Recipe = Recipe;



