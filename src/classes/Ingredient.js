import ingredientsData from "../data/ingredients";

class Ingredient {
  constructor(id, name, estimatedCostInCents) {
    this.id = id;
    this.name = name;
    this.estimatedCostInCents = estimatedCostInCents;
  }

  // getIngredientId(ingredientName) {
  //   const foundIngredient = ingredientsData.find(
  //     (ingredient) => ingredientName === ingredient.name
  //   );

  //   return foundIngredient.id;
  // }
}

export default Ingredient;
