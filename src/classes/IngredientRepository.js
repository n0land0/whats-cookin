// import ingredientsData from '../data/ingredients';
import Ingredient from './Ingredient';

class IngredientRepository {
  constructor(ingredientsData) {
    this.ingredients = ingredientsData;
  }

  makeIngredients() {
    this.ingredients = this.ingredients
      .filter((ingredient) => ingredient.name)
      .map(
        (ingredient) =>
          new Ingredient(
            ingredient.id,
            ingredient.name,
            ingredient.estimatedCostinCents
          )
      );
  }

  getIngredientId(ingredientName) {
    const foundIngredients = this.ingredients.filter((ingredient) =>
      ingredient.name.includes(ingredientName.toLowerCase())
    );
    return foundIngredients.map((ingredient) => ingredient.id);
  }
}

export default IngredientRepository;
