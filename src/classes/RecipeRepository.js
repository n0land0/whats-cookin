import Recipe from "./Recipe";

class RecipeRepository {
  constructor(recipeData) {
    this.recipes = recipeData;
  }

  makeRecipes() {
    this.recipes = this.recipes.map(
      (recipe) => new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags)
    );
  }

  returnRecipesByName(name) {
    return this.recipes.filter((recipe) => recipe.name.toLowerCase().includes(name.toLowerCase()));
  }

  returnRecipesByTag(tag) {
    return this.recipes.filter((recipe) => recipe.tags.includes(tag));
  }

  returnRecipesByIngredient(ingredientId) {
    return this.recipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) => ingredientId.includes(ingredient.id))
    );
  }
}

export default RecipeRepository;
