import recipeData from '../data/recipes';
import ingredientsData from '../data/ingredients';

class Recipe {
  constructor(id, image, ingredients, instructions, name, tags) {
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
    this.isFaved = false;
    this.toBeCooked = false;
  }

  showIngredientsByName() {
    let idArray = this.ingredients.map((ele) => ele.id);

    let nameArray = idArray.map(
      (id) => ingredientsData.find((data) => data.id === id).name
    );

    return nameArray;
  }

  calculateRecipeCostInDollars() {
    let idArray = this.ingredients.map((ele) => ele.id);
    /* Another way of doing this method
    let amountArray = this.ingredients.map((ele) => ele.quantity.amount);

    let costArray = idArray.map((id) => ingredientsData.find((data) => data.id === id).estimatedCostInCents);

    console.log(idArray, amountArray, costArray);

    return costArray
      .map((costInCents, index) => costInCents * amountArray[index])
      .reduce((accumulator, current) => {
        accumulator += current;
        return accumulator;
      });
      */
    let ingredientArray = idArray.map((id) =>
      ingredientsData.find((data) => data.id === id)
    );

    return (
      ingredientArray.reduce(
        (acc, ingredient) =>
          (acc +=
            ingredient.estimatedCostInCents *
            this.ingredients.find((data) => data.id === ingredient.id).quantity
              .amount),
        0
      ) / 100
    ).toFixed(2);
  }

  showInstructions() {
    let instructionText = this.instructions.map((ele) => {
      let step = {};
      step[ele.number] = ele.instruction;
      return step;
    });

    return instructionText;
  }
}

export default Recipe;
