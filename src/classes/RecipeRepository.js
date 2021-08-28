import Recipe from './Recipe';
class RecipeRepository {
  constructor(recipeData) {
    // this.id = recipeData.id;
    // this.image = recipeData.image;
    // this.ingredients = recipeData.ingredients;
    // this.instructions = recipeData.ingredients;
    // this.name = recipeData.name;
    // this.tags = recipeData.tags;
    this.recipes = recipeData.map(
      (recipe) =>
        new Recipe(
          recipe.id,
          recipe.image,
          recipe.ingredients,
          recipe.instructions,
          recipe.name,
          recipe.tags
        )
    );
  }
}

// returnRecipeByTags()

// returnRecipeByNames()

export default RecipeRepository;
