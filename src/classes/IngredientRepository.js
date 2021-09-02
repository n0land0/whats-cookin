import ingredientsData from "../data/ingredients";
import Ingredient from "./Ingredient";

class IngredientRepository {
  constructor(ingredientsData) {
    this.ingredients = ingredientsData
  }

  makeIngredients() {
    this.ingredients = this.ingredients.map(
      (ingredient) =>
        new Ingredient(
          ingredient.id,
          ingredient.name,
          ingredient.estimatedCostinCents
        )
    );
  }

  getIngredientId(ingredientName) {
    // tried changing find to filter - why is ingredient.name undefined?
    const foundIngredients = this.ingredients.filter(
      // (ingredient) => ingredientName === ingredient.name
      (ingredient) => ingredient.name.includes(ingredientName)
    );
// now we want an array of ids
// search
    // return foundIngredients.id;
    return foundIngredients.map(ingredient => ingredient.id);
  }
}

export default IngredientRepository;
