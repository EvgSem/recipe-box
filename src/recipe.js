import mongoose from 'mongoose';

export const recipeSchema = mongoose.Schema({
    name:    String,
    ingredients: []
}, { collection: 'recipes' });

export const recipeModel = mongoose.model('recipeModel', recipeSchema);

export class Ingrgedient {
    constructor(name, account){
        this.name = name;
        this.amount = account;
    }
};

export class Recipe {
    constructor() {
        this.name = '';
        this.ingredients = []
    }
    addIngredient(name, account){
        let ingredient= new Ingrgedient(name, account);
        this.ingredients.push(ingredient);
    }
};



