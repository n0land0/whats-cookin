/* eslint-disable max-len */
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

  determineMissingIngAmounts(recipe) {
    let shoppingList = recipe.ingredients.reduce((acc, ingredient) => {
      let missingIng = {}
      let findResult = this.pantryShelf.find(pantryIng => pantryIng.ingredient === ingredient.id);
      if (findResult) {
        let amountGap = findResult.amount - ingredient.quantity.amount;
        if (amountGap < 0) {
          missingIng.id = ingredient.id;
          missingIng.missingAmount = -1 * amountGap; 
          acc.push(missingIng);
        } 
      } else {
        missingIng.id = ingredient.id;
        missingIng.missingAmount = ingredient.quantity.amount;
        acc.push(missingIng);
      } 
      return acc;
    }, [])

    return shoppingList;
  }
}

export default Pantry;