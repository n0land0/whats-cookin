import { assert } from 'chai';

import Ingredient from '../src/classes/Ingredient';

describe('Ingredient', () => {
  let ingredient;

  beforeEach(function () {
    ingredient = new Ingredient(20081, 'wheat flour', 142);
  });

  it('Should be a function', () => {
    assert.isFunction(Ingredient);
  });

  it('Should be an instance of ingredient', () => {
    assert.instanceOf(ingredient, Ingredient);
  });

  it('Should have an ID', () => {
    assert.equal(ingredient.id, 20081);
  });

  it('Should have a name', () => {
    assert.equal(ingredient.name, 'wheat flour');
  });

  it('Should have an estimated cost in cents', () => {
    assert.equal(ingredient.estimatedCostInCents, 142);
  });
});
