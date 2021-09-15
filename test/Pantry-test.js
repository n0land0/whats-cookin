/* eslint-disable max-len */
import { assert } from "chai";
import Pantry from "../src/classes/Pantry";
import users from "../src/data/users";
import Recipe from "../src/classes/Recipe";
import User from "../src/classes/User";

describe.only("Pantry class", function () {
  let recipe1, recipe2, user1, user2, pantry1, pantry2;
  let trueCase = {
    id: 412309,
    image: 'https://spoonacular.com/recipeImages/412309-556x370.jpeg',
    ingredients: [
      {
        id: 1002030,
        quantity: {
          amount: 4,
          unit: 'teaspoons',
        },
      },
      {
        id: 1001,
        quantity: {
          amount: 2,
          unit: 'cups',
        },
      }
    ],
    instructions: [
      {
        instruction:
          'Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.',
        number: 1,
      },
    ],
    name: "Dirty Steve's Original Wing Sauce",
    tags: ['sauce'],
  };
  let missingIngCase = {
    id: 412309,
    image: 'https://spoonacular.com/recipeImages/412309-556x370.jpeg',
    ingredients: [
      {
        id: 1002030,
        quantity: {
          amount: 4,
          unit: 'teaspoons',
        },
      },
      {
        id: 1001,
        quantity: {
          amount: 2,
          unit: 'cups',
        },
      },
      {
        id: 6168,
        quantity: {
          amount: 8,
          unit: 'cups',
        },
      },
    ],
    instructions: [
      {
        instruction:
          'Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.',
        number: 1,
      },
    ],
    name: "Dirty Steve's Original Wing Sauce",
    tags: ['sauce'],
  };
  let notEnoughAmountUser = {
    name: "Saige O'Kon",
    id: 1,
    pantry: [
      {
        ingredient: 11297,
        amount: 4,
      },
      {
        ingredient: 1082047,
        amount: 10,
      },
      {
        ingredient: 20081,
        amount: 5,
      },
      {
        ingredient: 11215,
        amount: 5,
      },
      {
        ingredient: 2047,
        amount: 6,
      },
      {
        ingredient: 1123,
        amount: 8,
      },
      {
        ingredient: 11282,
        amount: 4,
      },
      {
        ingredient: 6172,
        amount: 2,
      },
      {
        ingredient: 2044,
        amount: 2,
      },
      {
        ingredient: 2050,
        amount: 4,
      },
      {
        ingredient: 1032009,
        amount: 3,
      },
      {
        ingredient: 5114,
        amount: 3,
      },
      {
        ingredient: 1017,
        amount: 2,
      },
      {
        ingredient: 18371,
        amount: 7,
      },
      {
        ingredient: 1001,
        amount: 6,
      },
      {
        ingredient: 99223,
        amount: 2,
      },
      {
        ingredient: 1230,
        amount: 2,
      },
      {
        ingredient: 9152,
        amount: 4,
      },
      {
        ingredient: 10611282,
        amount: 2,
      },
      {
        ingredient: 93607,
        amount: 2,
      },
      {
        ingredient: 14106,
        amount: 4,
      },
      {
        ingredient: 1077,
        amount: 4,
      },
      {
        ingredient: 6150,
        amount: 2,
      },
      {
        ingredient: 1124,
        amount: 2,
      },
      {
        ingredient: 10011693,
        amount: 4,
      },
      {
        ingredient: 1102047,
        amount: 2,
      },
      {
        ingredient: 19206,
        amount: 2,
      },
      {
        ingredient: 1145,
        amount: 4,
      },
      {
        ingredient: 1002030,
        amount: 1,
      },
      {
        ingredient: 12061,
        amount: 2,
      },
      {
        ingredient: 19335,
        amount: 4,
      },
      {
        ingredient: 15152,
        amount: 3,
      },
      {
        ingredient: 9003,
        amount: 2,
      },
      {
        ingredient: 18372,
        amount: 3,
      },
      {
        ingredient: 2027,
        amount: 2,
      },
    ],
  }

  beforeEach(function () {
    recipe1 = new Recipe(
      trueCase.id,
      trueCase.image,
      trueCase.ingredients,
      trueCase.instructions,
      trueCase.name,
      trueCase.tags
    )
    recipe2 = new Recipe(
      missingIngCase.id,
      missingIngCase.image,
      missingIngCase.ingredients,
      missingIngCase.instructions,
      missingIngCase.name,
      missingIngCase.tags
    )
    user1 = new User(users[0]);
    user2 = new User(notEnoughAmountUser);  
    pantry1 = new Pantry(user1.userPantry);  
    pantry2 = new Pantry(user2.userPantry);
  })

  it("should return true if user's pantry has all ingredients and the amount to cook a recipe", () => {
    assert.equal(pantry1.checkIfIsPossibleToCookARecipe(recipe1), true);
  })

  it("should return false if the ingredient isn't on the pantry", () => {
    assert.equal(pantry1.checkIfIsPossibleToCookARecipe(recipe2), false);
  })

  it("should return false if there isn't enough of the ingredient", () => {
    assert.equal(pantry2.checkIfIsPossibleToCookARecipe(recipe1), false);
  })
})