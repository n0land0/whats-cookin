import Recipe from './Recipe';

class RecipeRepository {
  constructor(recipeData) {
    this.recipes = recipeData;
  }

  makeRecipes() {
    this.recipes = this.recipes.map(
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

  returnCriteria(property, criterion) {
    return this.recipes.filter((recipe) =>
      recipe[property].includes(criterion)
    );
  }

  returnRecipesByIngredient(ingredientId) {
    return this.recipes.filter((recipe) =>
    //   recipe.ingredients.some((ingredient) => ingredient.id === ingredientId)
      recipe.ingredients.some((ingredient) => ingredientId.includes(ingredient.id))
    );
  }
}

export default RecipeRepository;

// returnCriteria(property, criterion = []) {
//   return this.recipes.filter((recipe) =>
//     criterion.forEach(crt => )
//     recipe[property].includes(criterion)
//   );
// }
