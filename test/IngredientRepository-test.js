import { assert } from "chai";

import IngredientRepository from "../src/classes/IngredientRepository";
import Ingredient from "../src/classes/Ingredient";
import ingredientsData from "../src/data/ingredients";

describe("IngredientRepository", () => {
  let ingredientRepository;

  beforeEach(function () {
    ingredientRepository = new IngredientRepository(ingredientsData);
  });

  it("Should be a function", () => {
    assert.isFunction(IngredientRepository);
  });

  it("Should be an instance of IngredientRepository", () => {
    assert.instanceOf(ingredientRepository, IngredientRepository);
  });

  it("Should hold ingredient objects", () => {
    ingredientRepository.makeIngredients();

    assert.instanceOf(ingredientRepository.ingredients[0], Ingredient);
  });

  it("Should be able to use ingredient name to return ingredient ID", () => {
    let matches = ingredientRepository.getIngredientId("wheat flour");

    assert.deepEqual(matches, [20081, 20011]);
  });
});
