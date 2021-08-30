import { assert } from 'chai';

import Recipe from '../src/classes/Recipe';
import recipeData from '../src/data/recipes';

describe('Recipe', () => {
  let recipe;

  beforeEach(function () {
    recipe = new Recipe(
      recipeData[0].id,
      recipeData[0].image,
      recipeData[0].ingredients,
      recipeData[0].instructions,
      recipeData[0].name,
      recipeData[0].tags
    );
  });

  it('Should be a function', () => {
    assert.isFunction(Recipe);
  });

  it('Should be an instance of RecipeRepository', () => {
    assert.instanceOf(recipe, Recipe);
  });

  it('Should have an ID', () => {
    assert.equal(recipe.id, 595736);
  });

  it('Should have an image url', () => {
    assert.equal(
      recipe.image,
      'https://spoonacular.com/recipeImages/595736-556x370.jpg'
    );
  });

  it('Should hold ingredients', () => {
    assert.deepEqual(recipe.ingredients[0], {
      id: 20081,
      quantity: {
        amount: 1.5,
        unit: 'c',
      },
    });
  });

  it('Should have instructions', () => {
    assert.deepEqual(recipe.instructions[1], {
      instruction: 'Add egg and vanilla and mix until combined.',
      number: 2,
    });
  });

  it('Should have a name', () => {
    assert.equal(recipe.name, 'Loaded Chocolate Chip Pudding Cookie Cups');
  });

  it('Should have tags', () => {
    assert.deepEqual(recipe.tags[2], 'snack');
  });

  it('Should be able to determine the names of ingredients needed', () => {
    assert.deepEqual(recipe.showIngredientsByName(), [
      'wheat flour',
      'bicarbonate of soda',
      'eggs',
      'sucrose',
      'instant vanilla pudding',
      'brown sugar',
      'salt',
      'fine sea salt',
      'semi sweet chips',
      'unsalted butter',
      'vanilla',
    ]);
  });

  it('Should be able to get the costs of its ingredients', () => {
    assert.equal(recipe.calculateRecipeCost(), 17776);
  });

  it('Should be able to return its instructions', () => {
    let recipeInstructions = recipe.showInstructions();

    assert.deepEqual(
      recipeInstructions['1'],
      'In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.'
    );
  });
});
