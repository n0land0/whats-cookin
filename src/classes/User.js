class User {
  constructor() {
    this.favoriteRecipes = [];
    this.favoriteRecipeTags = [];
    this.selectedFavTags = []; // updates as dom changes
    this.recipesToCook = [];
    this.recipesToCookTags = [];
  }

  addToFavorites(recipe) {
    recipe.isFaved = true;
    if (!this.favoriteRecipes.some((ele) => ele.id === recipe.id)) {
      this.favoriteRecipes.push(recipe);
    }
  }

  addToRecipesToCook(recipe) {
    recipe.toBeCooked = true;
    if (!this.recipesToCook.some((ele) => ele.id === recipe.id)) {
      this.recipesToCook.push(recipe);
    }
  }

  removeFromFavorites(recipe) {
    recipe.isFaved = false;
    let recipeIndex = this.favoriteRecipes.findIndex((ele) => ele.id === recipe.id);

    this.favoriteRecipes.splice(recipeIndex, 1);
  }

  collectTagsFromFavorites() {
    this.favoriteRecipes.forEach((recipe) => {
      this.favoriteRecipeTags.push(recipe.tags);
    });
    let tagSet = [...new Set(this.favoriteRecipeTags.flat())];
    this.favoriteRecipeTags = tagSet;
    return this.favoriteRecipeTags;
  }

  filterFavoriteRecipesByTag() {
    let filteredRecipes = [];
    if (this.selectedFavTags.length > 0) {
      this.selectedFavTags.forEach((tag) => {
        filteredRecipes = this.favoriteRecipes.filter((ele) => ele.tags.includes(tag));
      });
    }
    return filteredRecipes;
  }

  filterFavoriteRecipesByIngredient(ingredientId) {
    return this.favoriteRecipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) => ingredientId.includes(ingredient.id))
    );
  }

  filterFavoriteRecipesByName(name) {
    //We should go back in and refactor returnCriteria method in recipeRespository to be more specific to the recipe name.

    return this.favoriteRecipes.filter((recipe) => recipe.name.toLowerCase().includes(name.toLowerCase()));
  }
}

export default User;
