import { assert } from 'chai';

// import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';

import recipeData from '../src/data/recipes';

describe('Recipe', () => {
  let recipe;

  beforeEach(function () {
    recipe = new Recipe(recipeData[0].id,recipeData[0].image, recipeData[0].ingredients, recipeData[0].instructions, recipeData[0].name, recipeData[0].tags);
  });

  it('Should be a function', () => {
    assert.isFunction(Recipe);
  });

  it('Should be an instance of RecipeRepository', () => {
    assert.instanceOf(recipe, Recipe);
  });