class User {
  constructor(user) {
    this.name = user.name;
    this.userId = user.id;
    this.userPantry = user.pantry;
    this.favoriteRecipes = [];
    // this.favoriteRecipeTags = [];
    // this.selectedFavTags = []; //s
    this.recipesToCook = [];
    // this.recipesToCookTags = [];
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
    return this.favoriteRecipeTags;
  }

  filterRecipesByTag(recipeSet,tags) {
    let filteredRecipes = [];

    tags.forEach((tag) => {
      let tempResult = recipeSet.filter((ele) => ele.tags.includes(tag));
      filteredRecipes = [...filteredRecipes, ...tempResult];
    });

    let uniqFilteredRecipes = Array.from(new Set(filteredRecipes.map((ele) => ele.id))).map((id) => {
      return filteredRecipes.find((ele) => ele.id == id);
    });
    return uniqFilteredRecipes;
  }


  filterFavoriteRecipesByIngredient(ingredientId) {
    return this.favoriteRecipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredientId.includes(ingredient.id)
      )
    );
  }

  filterFavoriteRecipesByName(name) {
    return this.favoriteRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(name.toLowerCase())
    );
  }
}

export default User;
