import Recipe from './Recipe';

class RecipeRepository {
  constructor(recipeData) {
    this.recipes = recipeData;
    // this.recipes = recipeData.map(
    //   (recipe) =>
    //     new Recipe(
    //       recipe.id,
    //       recipe.image,
    //       recipe.ingredients,
    //       recipe.instructions,
    //       recipe.name,
    //       recipe.tags
    //     )
    // )
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
    )
  }
  returnCriteria(property, criterion) {
    return this.recipes.filter(recipe => recipe[property].includes(criterion));
  }
}


export default RecipeRepository;
