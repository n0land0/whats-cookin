// IMPORTS
import "./styles.css";
import apiCalls from "./apiCalls";
import RecipeRepository from "./classes/RecipeRepository";
import recipeData from "./data/recipes.js";
import IngredientRepository from "./classes/IngredientRepository";
import ingredientsData from "./data/ingredients.js";

// SELECTORS
const showAllRecipeBtn = document.getElementById("show-all-recipes");
const showRecipeByTagBtn = document.getElementById("show-recipe-by-tag");

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

// LISTENERS
window.addEventListener("load", function () {
  generateAllRecipes();
  recipePool = recipeRepository.recipes;
  generateAllIngredients();
  generateAllTags();
});

showAllRecipeBtn.addEventListener("click", function () {
  recipePool = recipeRepository.recipes;
  deselectCheckboxes();
  showRecipePool();
});

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
// FUNCTIONS
function generateAllRecipes() {
  event.preventDefault();
  recipeRepository = new RecipeRepository(recipeData);
  recipeRepository.makeRecipes();
  // recipePool = recipeRepository.recipes;
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
  hide(recipeDetailView);
  show(recipePoolView);
  recipePoolView.innerHTML = "";
  recipePool.forEach((recipe) => {
    recipePoolView.innerHTML += `
      <article id="${recipe.id}">
        <img src=${recipe.image}>
        <p>${recipe.name}</p>
      </article>
    `;
  });
}

function collectTags() {
  selectedTags = [];
  let checkBoxes = document.querySelectorAll("input[type=checkbox]:checked");
  for (let i = 0; i < checkBoxes.length; i++) {
    selectedTags.push(checkBoxes[i].value);
  }
  console.log(selectedTags);
}

function showRecipesByTag() {
  if (event.target.type === "checkbox") {
    if (selectedTags.length > 0) {
      selectedTags.forEach((tag) => (recipePool = recipeRepository.returnRecipesByTag(tag)));
    } else {
      recipePool = recipeRepository.recipes;
    }
  }
}

function deselectCheckboxes() {
  let checkboxes = document.querySelectorAll("input[type=checkbox]");
  console.log(checkboxes);
  checkboxes.forEach((ele) => {
    ele.checked = false;
  });
}

function searchByName() {
  event.preventDefault();
  if (searchInputField.value) {
    recipePool = recipeRepository.returnRecipesByName("name", searchInputField.value);
  }
}

function searchByIngredient() {
  event.preventDefault();
  let ingredientIds = ingredientRepository.getIngredientId(searchInputField.value);
  let recipesContainingIngredient = recipeRepository.returnRecipesByIngredient(ingredientIds);
  recipesContainingIngredient.forEach((recipe) => {
    if (!recipePool.some((el) => el.name === recipe.name)) {
      recipePool.push(recipe);
    }
  });
}

function showRecipeDetails(event) {
  console.log("im working");
  let recipeId = event.target.parentNode.id;
  console.log(event.target.parentNode);
  console.log("recipeId", recipeId);
  let recipeClicked = recipePool.find((ele) => ele.id == recipeId);
  console.log("recipeClicked", recipeClicked);
  console.log("recipe pool", recipePool);
  let ingredients = recipeClicked.showIngredientsByName().join(", ");
  let instructions = recipeClicked.showInstructions();
  let cost = recipeClicked.calculateRecipeCostInDollars();
  hide(recipePoolView);
  show(recipeDetailView);
  recipeDetailView.innerHTML = `
    <article class="recipe-detail-container">
      <h3>${recipeClicked.name}</h3>
      <img src="${recipeClicked.image}">
      <p>Ingredients: <span>${ingredients}</span></p> 
      <p>Total cost: <span>$${cost}</span></p>
    </article>
  `;
  instructions.forEach((ele) => {
    let key = Object.keys(ele).toString();
    let instruction = Object.values(ele).toString();
    recipeDetailView.innerHTML += `
    <span>Step ${key}</span>
    <p>${instruction}</p>
    `;
  });
}

// UTILITY FUNCTIONS
function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}
