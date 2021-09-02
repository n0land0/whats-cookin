// IMPORTS
import "./styles.css";
import apiCalls from "./apiCalls";
import RecipeRepository from "./classes/RecipeRepository";
import recipeData from "./data/recipes.js";
import IngredientRepository from "./classes/IngredientRepository";
import ingredientsData from "./data/ingredients.js"

// SELECTORS
const showAllRecipeBtn = document.getElementById("show-all-recipes");
const showRecipeByTagBtn = document.getElementById("show-recipe-by-tag");

const recipeTagForm = document.getElementById("recipe-tag-form");
const searchInputField = document.getElementById("search-input-field");
const searchBtn = document.getElementById("search-button");

const recipeContainer = document.getElementById("recipe-container");

// GLOBAL VARIABLES
let recipeRepository;
let ingredientRepository;
let recipePool;
let ingredientPool;
let selectedTags = []; // <= this needs to be in a function

// LISTENERS
window.addEventListener("load", function () {
  generateAllRecipes();
  generateAllIngredients();
  generateAllTags();
});

showAllRecipeBtn.addEventListener("click", showRecipePool);
recipeTagForm.addEventListener("click", function () {
  collectTags();
  showRecipesByTag();
  showRecipePool();
});

searchBtn.addEventListener("click", function() {
  searchByIngredient();
  showRecipePool();
});

// FUNCTIONS
function generateAllRecipes() {
  event.preventDefault();
  recipeRepository = new RecipeRepository(recipeData);
  recipeRepository.makeRecipes();
  recipePool = recipeRepository.recipes;
  // generateTags();
}

function generateAllIngredients() {
  event.preventDefault();
  ingredientRepository = new IngredientRepository(ingredientsData);
  ingredientRepository.makeIngredients();
  ingredientPool = ingredientRepository.ingredients;
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
  let checkBoxes = document.querySelectorAll("input[type=checkbox]:checked");
  for (let i = 0; i < checkBoxes.length; i++) {
    selectedTags.push(checkBoxes[i].value);
  }
  console.log(selectedTags);
}

function showRecipesByTag() {
  if (event.target.type === "checkbox") {
    if (selectedTags.length > 0) {
      selectedTags.forEach((tag) => (recipePool = recipeRepository.returnCriteria("tags", tag)));
    } else {
      recipePool = recipeRepository.recipes;
    }
  }
}

// SEARCH RECIPES BY INGREDIDIENT

//When we search by ingredients, we call the recipeRepository.returnRecipesByIngredient method in order to do so.
// grab ingredient search term from user input - <<search bar>>.value

function searchByIngredient() {
  event.preventDefault();
  let ingredientIds = ingredientRepository.getIngredientId(searchInputField.value);
  let recipesContainingIngredient = recipeRepository.returnRecipesByIngredient(ingredientIds);
  recipePool = recipesContainingIngredient;
}



//When searching by name we call the recipeRepository.returnCriteria("name", 'name of ingredient')

// recipeRepository.returnCriteria("name", <user input>) ==> Recipe instance

// UTILITY FUNCTIONS
function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}
