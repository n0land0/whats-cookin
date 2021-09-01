import './styles.css';
import apiCalls from './apiCalls';
import RecipeRepository from './classes/RecipeRepository';
import recipeData from './data/recipes.js';

const showAllRecipeBtn = document.getElementById('show-all-recipes');
const showRecipeByTagBtn = document.getElementById('show-recipe-by-tag');
const searchRecipeByNameBtn = document.getElementById('search-recipe-by-name');
const recipeContainer = document.getElementById('recipe-container');
const recipeTagForm = document.getElementById('recipe-tag-form');
var recipeRepository;
var recipePool;
var selectedTags;

window.addEventListener('load', function () {
  generateAllRecipes();
  generateAllTags();
});

showAllRecipeBtn.addEventListener('click', showRecipePool);
recipeTagForm.addEventListener('click', function () {
  collectTags();
  showRecipesByTag();
  showRecipePool();
});

function generateAllRecipes() {
  event.preventDefault();
  recipeRepository = new RecipeRepository(recipeData);
  recipeRepository.makeRecipes();
  recipePool = recipeRepository.recipes;
  // generateTags();
}

function generateAllTags() {
  let recipeTags = [];
  recipePool.forEach((recipe) => {
    recipeTags.push(recipe.tags);
  });
  let tagSet = [...new Set(recipeTags.flat())];
  tagSet.forEach((tag) => {
    recipeTagForm.innerHTML += `
      <input type="checkbox" class="recipe-tag' id="${tag}" value="${tag}"></input>
      <label for="${tag}">${tag}</label>
    `;
  });
}

function showRecipePool() {
  recipeContainer.innerHTML = "";
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
function collectTags() {
  let checkBoxes = document.querySelectorAll('input[type=checkbox]:checked');
  selectedTags = [];
  for (let i = 0; i < checkBoxes.length; i++) {
    selectedTags.push(checkBoxes[i].value);
  }
  console.log(selectedTags);
}

function showRecipesByTag() {
  if (event.target.type === 'checkbox') {
    if (selectedTags.length > 0) {
      selectedTags.forEach(
        (tag) => (recipePool = recipeRepository.returnCriteria('tags', tag))
      );
    } else {
      recipePool = recipeRepository.recipes;
    }
  }
}
// recipePool.forEach((recipe, index) => {
//   let counter = 0;
//   selectedTags.forEach((tag) => {
//     if (recipe.tags.includes(tag)) {
//       counter++;
//     }
//   });
//   if (counter === 0) {
//     recipePool.splice(index, 1);
//   }
// });
// var elems = document.getElementsByID("recipe-tag-checkboxes");
// var list = [];
// for(var i=0; elems[i]; ++i){
//       if(elems[i].checked){
//            list.push(elems[i].value);
//       }
// }
// var getRecipes = recipes.filter(function (recipe) {
//     return list.indexOf(recipe.recipeType) >= 0;
// });

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

// recipeTagCheckboxes.childNodes.forEach((ele) => {
//   let selectedTags = [];
//   if (ele.type === 'checkbox') {
//     selectedTags.push(ele.id);
//   }
// });


// UTILITY FUNCTIONS
function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}