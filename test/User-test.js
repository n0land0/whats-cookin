import { assert } from 'chai';

import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';

import recipeData from '../src/data/recipes';
import usersData from '../src/data/users';
import ingredientsData from '../src/data/ingredients';

describe('User', () => {
  let user;
  let recipe1;
  let recipe2;
  let wheatFlour;
  let appleCider;
  let apple;
  beforeEach(function () {
    user = new User(usersData[0]);
    recipe1 = new Recipe(
      recipeData[0].id,
      recipeData[0].image,
      recipeData[0].ingredients,
      recipeData[0].instructions,
      recipeData[0].name,
      recipeData[0].tags
    );
    recipe2 = new Recipe(
      recipeData[1].id,
      recipeData[1].image,
      recipeData[1].ingredients,
      recipeData[1].instructions,
      recipeData[1].name,
      recipeData[1].tags
    );
    wheatFlour = new Ingredient(20081, 'wheat flour', 142);
    appleCider = new Ingredient(1009016, 'apple cider', 468);
    apple = new Ingredient(9003, 'apple', 207);
    user.addToFavorites(recipe1);
    user.addToFavorites(recipe2);
  });

  it('Should be a function', () => {
    assert.isFunction(User);
  });

  it('Should be an instance of User', () => {
    assert.instanceOf(user, User);
  });

  it('Should allow a user to favorite recipes', () => {
    assert.deepEqual(user.favoriteRecipes[0], recipe1);
  });

  it('Should allow a user to unfavorite recipes', () => {
    user.removeFromFavorites(recipe1);

    assert.deepEqual(user.favoriteRecipes[0], recipe2);
  });

  it('Should allow a user to designate recipes to cook', () => {
    user.addToRecipesToCook(recipe2);

    assert.deepEqual(user.recipesToCook[0], recipe2);
  });

  it('Should allow a user to filter favorite recipes by one tag', () => {
    let tags = ['antipasti'];
    let filteredRecipes = user.filterRecipesByTag(user.favoriteRecipes, tags);
    assert.deepEqual(filteredRecipes[0], recipe1);
  });

  it('Should allow a user to filter favorite recipes by multiple tags', () => {
    let tags = ['snack', 'dinner'];
    let filteredRecipes = user.filterRecipesByTag(user.favoriteRecipes, tags);
    assert.deepEqual(filteredRecipes[0], recipe1);
    assert.deepEqual(filteredRecipes[1], recipe2);
  });

  it('Should allow a user to filter recipes by name', () => {
    let name1 = 'chocolate chip';
    let result1 = user.filterRecipesByName(user.favoriteRecipes, name1);
    let name2 = 'Apple Cider';
    let result2 = user.filterRecipesByName(user.favoriteRecipes, name2);
    assert.deepEqual(result1, [recipe1]);
    assert.deepEqual(result2, [recipe2]);
  });
});
