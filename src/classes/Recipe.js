import recipeData from "../data/recipes";
import ingredientsData from "../data/ingredients";

class Recipe {
  constructor(id, image, ingredients, instructions, name, tags) {
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
  }

  showIngredientsByName() {
    let idArray = this.ingredients.map((ele) => ele.id);

    let nameArray = idArray.map((id) => ingredientsData.find((data) => data.id === id).name);

    return nameArray;
  }

  calculateRecipeCost() {
    let idArray = this.ingredients.map((ele) => ele.id);
    /*
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
    let ingredientArray = idArray.map((id) => ingredientsData.find((data) => data.id === id));
    console.log(typeof ingredientArray[0].estimatedCostInCents);
    console.log(typeof this.ingredients[0].quantity.amount);

    return ingredientArray.reduce(
      (acc, ingredient) =>
        (acc +=
          ingredient.estimatedCostInCents * this.ingredients.find((data) => data.id === ingredient.id).quantity.amount),
      0
    );
  }

  // (ingredient.quantity.amount * costArray) / 100

  // showInstructions()
  // return obj with step # as key, instruction text as value?
  // .reduce()?
}

export default Recipe;

// let idArray = this.ingredients.map((ele) => ele.id);

// let amountArray = this.ingredients.map((ele) => ele.quantity.amount)

// let costArray = idArray.map((id) =>
// ingredientsData.find((data) =>
// data.id === id
// ).estimatedCostInCents);

// costArray.map((costInCents, index) =>
// costInCents * amountArray[index]
// ).reduce((accumulator, current) => {
// accumulator += current;
// return accumulator;
// })
