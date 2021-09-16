import RecipeRepository from "./classes/RecipeRepository";
import IngredientRepository from "./classes/IngredientRepository";
import User from "./classes/User";
import userData from "./data/users.js";
import recipeData from "./data/recipes.js";
import ingredientsData from "./data/ingredients.js";

const showAllRecipeBtn = document.getElementById("show-all-recipes");
const showRecipeByTagBtn = document.getElementById("show-recipe-by-tag");
const showFavBtn = document.getElementById("show-favorites");
const showQueueBtn = document.getElementById("show-queue");

const recipeTagForm = document.getElementById("recipe-tag-form");
const searchInputField = document.getElementById("search-input-field");
const searchBtn = document.getElementById("search-button");

const recipeContainer = document.getElementById("recipe-container");
const recipePoolView = document.querySelector(".recipe-pool-view");
const recipeDetailView = document.querySelector(".recipe-detail-view");

// GLOBAL VARIABLES
let recipeRepository;
let ingredientRepository;
let recipePool;
let ingredientPool;
let selectedTags;
let user;

window.addEventListener("load", function () {
  generateAllRecipes();
  recipePool = recipeRepository.recipes;
  generateAllIngredients();
  generateAllTags();
  generateRandomUser();
});

// BUTTONS
showAllRecipeBtn.addEventListener("click", function () {
  recipePool = recipeRepository.recipes;
  deselectCheckboxes();
  showRecipePool();
});

showFavBtn.addEventListener("click", showFavorite);

showQueueBtn.addEventListener("click", showQueue);

// FORM
recipeTagForm.addEventListener("click", function () {
  collectTags();
  showRecipesByTag();
  showRecipePool();
});

searchBtn.addEventListener("click", function () {
  recipePool = [];
  searchByName();
  searchByIngredient();

  showRecipePool();
});

recipeContainer.addEventListener("click", showRecipeDetails);
