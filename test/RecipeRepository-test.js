import { assert } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import recipeData from '../src/data/recipes';

describe('RecipeRepository', () => {
  let recipe;
  let recipeRepository;

  beforeEach(function () {
    recipe = new Recipe();
    recipeRepository = new RecipeRepository(recipeData);
  });
  it('Should be a function', () => {
    assert.isFunction(RecipeRepository);
  });

  it('Should be an instance of RecipeRepository', () => {
    assert.instanceOf(recipeRepository, RecipeRepository);
  });

  it('Should hold recipe objects', () => {
    // console.log(recipeRepository);
    assert.instanceOf(recipeRepository.recipes[0], Recipe);
  });

  it('Should take in recipe data');

  it('Should be able to return a list of recipes based on tags');

  it('Should be able to return a list of recipes based on name');

  it('Should be able to return a list of recipes based on ingredients');
});
