class User {
  constructor() {
    this.favoriteRecipes = [];
    this.favoriteRecipeTags = [];
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
    let recipeIndex = this.favoriteRecipes.findIndex(
      (ele) => ele.id === recipe.id
    );

    this.favoriteRecipes.splice(recipeIndex, 1);
  }

  collectTagsFromFavorites() {
    this.favoriteRecipes.forEach((recipe) => {
      this.favoriteRecipeTags.push(recipe.tags);
    });
    let tagSet = [...new Set(this.favoriteRecipeTags.flat())];
    this.favoriteRecipeTags = tagSet;
  }

  filterFavoriteRecipesByTag(tag) {
    return this.favoriteRecipes.filter((recipe) => recipe.tags.includes(tag));
  }

  filterFavoriteRecipesByingredient() {}
}

export default User;
