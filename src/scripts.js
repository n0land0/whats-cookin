import './styles.css';
import apiCalls from './apiCalls';
import RecipeRepository from './classes/RecipeRepository';
import recipeData from './data/recipes.js';

const showAllRecipeBtn = document.getElementById('show-all-recipes');
const showRecipeByTagBtn = document.getElementById('show-recipe-by-tag');
const searchRecipeByNameBtn = document.getElementById('search-recipe-by-name');
const recipeContainer = document.getElementById('recipe-container');
const recipeTagCheckboxes = document.getElementById('recipe-tag-checkboxes');
var recipePool;

window.addEventListener('load', function () {
  generateRecipes();
  generateTags();
});

showAllRecipeBtn.addEventListener('click', showAllRecipes);
recipeTagCheckboxes.addEventListener('click', showRecipesByTag);

function generateRecipes() {
  event.preventDefault();
  let recipeRepository = new RecipeRepository(recipeData);
  recipeRepository.makeRecipes();
  recipePool = recipeRepository.recipes;
  // generateTags();
}

function generateTags() {
  let recipeTags = [];
  recipePool.forEach((recipe) => {
    recipeTags.push(recipe.tags);
  });
  let tagSet = [...new Set(recipeTags.flat())];
  tagSet.forEach((tag) => {
    recipeTagCheckboxes.innerHTML += `
      <input type="checkbox" id="${tag}" value="${tag}></input>
      <label for="${tag}">${tag}</label>
    `;
  });
}

function showAllRecipes() {
  recipePool.forEach((recipe) => {
    recipeContainer.innerHTML += `
      <article>
        <img src=${recipe.image}>
        <p>${recipe.name}</p>
      </article>
    `;
    //Give article an ID,
    // add event listener to that ID
    // so that when the user clicks,
    // a new page loads with the recipe image, name, ingredients, total cost and instructions.
  });
}

// Add event listener to entire form
// if target is checked, run handler to filter recipes & repopulate container
function showRecipesByTag() {
  if (event.target.type === 'checkbox') {
    console.log(event.target);
    recipePool = recipePool.forEach((recipe, index) => {
      let counter = 0;
      selectedTags.forEach((tag) => {
        if (recipe.tags.includes(tag)) {
          counter++;
        }
      });
      if (!counter) {
        recipePool.splice(index, 1);
      }
    });
  }
}

// In the whole array if the number checked is not equal to 0 that means we have at least 1 tag selected.  Instead, if the number checked is greater than the existing checked box that means we have checked a new box and we append the new result to our old container.

// check for checked inputs
// populate the recipe display container with those checked inputs

// recipeData.returnCriteria("tag", event.target.id)

// recipeData.forEach((recipe) => {
//   recipeContainer.innerHTML += `
//     <article>
//       <img src=${recipe.image}>
//       <p>${recipe.name}</p>
//     </article>
//   `;
// }
// USE SAME CONTAINER AS SHOWALLRECIPES VVV

//When we search by ingredients, we call the recipeRepository.returnRecipesByIngredient method in order to do so.

// let ingredientID = ingredientRepository.getIngredientId(<user input> "wheat flour") ==> 20081
// recipeRepository.returnRecipesByIngredient(ingredientId)

//When searching by name we call the recipeReposity.returnCriteria("name", 'name of ingredient')

// recipeRepository.returnCriteria("name", <user input>) ==> Recipe instance
