import { assert } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import recipeData from '../src/data/recipes';

describe('RecipeRepository', () => {
  // let recipe;
  let recipeRepository;

  beforeEach(function () {
    // recipe = new Recipe();
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
    console.log(snacks)
    // console.log(recipeRepository.returnCriteria('tags', 'snack'));
    // console.log(recipeRepository.recipes[0]['tags'].includes('snack'));
    // console.log(recipeRepository.recipes[0]['tags']);

    assert.includeMembers(snacks[0].tags, ['snack'])
  });
    
  it('Should be able to return a list of recipes based on name');

  it('Should be able to return a list of recipes based on ingredients');
});
