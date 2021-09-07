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
    return this.recipes.filter((recipe) => 
      recipe.name.toLowerCase().includes(name.toLowerCase()));
  }

  returnRecipesByIngredient(ingredientId) {
    return this.recipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) => ingredientId.includes(ingredient.id))
    );
  }

  returnRecipesByTag(tags) {
    let filteredRecipes = [];

    tags.forEach((tag) => {
      let tempResult = this.recipes.filter((ele) => ele.tags.includes(tag));
      filteredRecipes = [...filteredRecipes, ...tempResult];
    });

    let uniqFilteredRecipes = Array.from(new Set(filteredRecipes.map((ele) => ele.id))).map((id) => {
      return filteredRecipes.find((ele) => ele.id == id);
    });
    return uniqFilteredRecipes;
  }
}

export default RecipeRepository;
