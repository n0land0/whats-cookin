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
    const foundIngredient = ingredientsData.find(
      (ingredient) => ingredientName === ingredient.name
    );

    return foundIngredient.id;
  }
}

export default IngredientRepository;
