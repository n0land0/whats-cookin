/* eslint-disable max-len */
/*
It should take the user and stores it on a property
Stores the user's pantry on a property
It should have a method to check pantry property 
*/

class Pantry {
  constructor(pantry) {
    this.pantryShelf = pantry;
  }

  checkIfIsPossibleToCookARecipe(recipe) {
    let recipeIngredients = recipe.ingredients.reduce((acc, ingredient) => {
      let ingredientDetails = {};
      ingredientDetails.id = ingredient.id;
      ingredientDetails.quantityRequired = ingredient.quantity.amount;
      acc.push(ingredientDetails);
      return acc;
    }, [])
    
    const result = recipeIngredients.every(ingredient => {
      let isOnPantry = this.pantryShelf.some(pantryIng => pantryIng.ingredient === ingredient.id);
      let isEnough;
      if (isOnPantry) {
        let foundIngredient = this.pantryShelf.find(pantryIng => pantryIng.ingredient === ingredient.id);
        isEnough = foundIngredient.amount >= ingredient.quantityRequired;
      }
      return isOnPantry && isEnough;
    }) 
    return result
  }
}

export default Pantry;