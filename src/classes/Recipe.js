import recipeData from '../data/recipes';
import ingredientsData from '../data/ingredients';

class Recipe {
  constructor(id, image, ingredients, instructions, name, tags) {
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
  }

  showIngredientsByName() {
    let idArray = this.ingredients.map((ele) => ele.id);

    let nameArray = idArray.map(
      (id) => ingredientsData.find((data) => data.id === id).name
    );

    return nameArray;
  }

  // calculateRecipeCost()

  // showInstructions()
  // return obj with step # as key, instruction text as value?
  // .reduce()?
}

export default Recipe;
