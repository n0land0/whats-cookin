import { assert } from 'chai';

import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';

import recipeData from '../src/data/recipes';

describe('RecipeRepository', () => {
  let recipeRepository;

  beforeEach(function () {
    recipeRepository = new RecipeRepository(recipeData);
  });
  it('Should be a function', () => {
    assert.isFunction(RecipeRepository);
  });

  it('Should be an instance of RecipeRepository', () => {
    assert.instanceOf(recipeRepository, RecipeRepository);
  });

  it('Should take in recipe data', () => {
    assert.property(recipeRepository.recipes[0], 'id');
  });

  it('Should hold recipe objects', () => {
    recipeRepository.makeRecipes();

    assert.instanceOf(recipeRepository.recipes[0], Recipe);
  });

  it('Should be able to return a list of recipes based on tags', () => {
    let snacks = recipeRepository.returnCriteria('tags', 'snack'); 

    assert.includeMembers(snacks[0].tags, ['snack']);
  });
    
  it('Should be able to return a list of recipes based on name', () => {
    let dirtySteve = recipeRepository.returnCriteria('name', 'Dirty Steve'); 

    assert.equal(dirtySteve[0].name.includes('Dirty Steve'), true);
  }); 

  it('Should be able to return a list of recipes based on ingredients', () => {
    let wheatFlour = new Ingredient(20081, "wheat flour", 142)
    let glutens = recipeRepository.returnRecipesByIngredient(wheatFlour.id);

    for (var i = 0; i < glutens.length; i++) {
      assert.equal(glutens[i].ingredients.find(ingredient => ingredient.id === 20081).id, wheatFlour.id);
    }
  });
});
