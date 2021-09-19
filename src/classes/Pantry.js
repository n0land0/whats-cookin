/* eslint-disable max-len */
class Pantry {
  constructor(userInstance) {
    this.userInstance = userInstance;
    this.pantryShelf = userInstance.userPantry;
  }

  checkIfIsPossibleToCookARecipe(recipe) {
    const result = recipe.ingredients.every((ingredient) => {
      let isOnPantry = this.pantryShelf.some(
        (pantryIng) => pantryIng.ingredient === ingredient.id
      );
      let isEnough;
      if (isOnPantry) {
        let foundIngredient = this.pantryShelf.find(
          (pantryIng) => pantryIng.ingredient === ingredient.id
        );
        isEnough = foundIngredient.amount >= ingredient.quantity.amount;
      }
      return isOnPantry && isEnough;
    });
    return result;
  }

  determineMissingIngAmounts(recipe) {
    let shoppingList = recipe.ingredients.reduce((acc, ingredient) => {
      let missingIng = {};
      let findResult = this.pantryShelf.find(
        (pantryIng) => pantryIng.ingredient === ingredient.id
      );
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
    }, []);

    return shoppingList;
  }

  addNamesToPantry(ingredientData) {
    let newPantry = this.pantryShelf.map((ingredient) => {
      let foundIng = ingredientData.find(
        (ele) => ele.id === ingredient.ingredient
      );
      let capitalizedName =
        foundIng.name.charAt(0).toUpperCase() + foundIng.name.slice(1);

      ingredient.name = capitalizedName;
      return ingredient;
    });
    return newPantry;
  }
}

export default Pantry;
