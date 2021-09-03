// IMPORTS
import "./styles.css";
import apiCalls from "./apiCalls";

import RecipeRepository from "./classes/RecipeRepository";
import IngredientRepository from "./classes/IngredientRepository";
import User from "./classes/User";
import userData from "./data/users.js";
import recipeData from "./data/recipes.js";
import ingredientsData from "./data/ingredients.js";

// SELECTORS
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

// LISTENERS
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

// FUNCTIONS

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
// function userFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }

// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function (event) {
//   if (!event.target.matches(".dropbtn")) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains("show")) {
//         openDropdown.classList.remove("show");
//       }
//     }
//   }
// };
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
  recipeTagForm.innerHTML = "";
  tagSet.forEach((tag) => {
    recipeTagForm.innerHTML += `
      <input type="checkbox" class="recipe-tag' id="${tag}" value="${tag}"></input>
      <label for="${tag}">${tag}</label>
    `;
  });
}

function generateRandomUser() {
  let rIndex = Math.floor(Math.random() * userData.length);
  let rUser = userData[rIndex];
  user = new User(rUser);
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
  // console.log(checkboxes);
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

// As a user, I should be able to favorite / unfavorite recipes that I like and can easily find again.

function showRecipeDetails(event) {
  let recipeId = event.target.parentNode.id;
  let recipeClicked = recipePool.find((ele) => ele.id == recipeId);
  let ingredients = recipeClicked.showIngredientsByName().join(", ");
  let instructions = recipeClicked.showInstructions();
  let cost = recipeClicked.calculateRecipeCostInDollars();

  hide(recipePoolView);
  show(recipeDetailView);

  recipeDetailView.innerHTML = `
    <article class="recipe-detail-container">
      <h3>${recipeClicked.name}</h3>
      <img src="${recipeClicked.image}">
      <button id="fave-button">
        <span id="fave-text">Add to favorites</span>
        <span id="unfave-text" class="hidden">Remove from favorites</span>
      </button>
      <button id="add-to-recipes-to-cook-button">
        <span id="add-to-cook-text">Add to Recipes to Cook</span>
        <span id="remove-from-cook-text" class="hidden">Remove From Recipes to Cook</span>
      </button>
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

  activateFaveButton(recipeClicked);
  activateAddToRecipesToCookButton(recipeClicked);
}

function activateFaveButton(recipeClicked) {
  let faveButton = document.getElementById("fave-button");
  let faveText = document.getElementById("fave-text");
  let unFaveText = document.getElementById("unfave-text");

  if (user.favoriteRecipes.includes(recipeClicked)) {
    resetClassList(faveText);
    resetClassList(unFaveText);
    hide(faveText);
  }

  faveButton.addEventListener("click", function () {
    if (!user.favoriteRecipes.includes(recipeClicked)) {
      user.favoriteRecipes.push(recipeClicked);
      hide(faveText);
      show(unFaveText);
    } else {
      let indexOfRecipeClicked = user.favoriteRecipes.indexOf(recipeClicked);
      user.favoriteRecipes.splice(indexOfRecipeClicked, 1);
      toggle(faveText);
      toggle(unFaveText);
    }
    console.log(user.favoriteRecipes);
  });
}
function showFavorite() {
  console.log(user);
  hide(recipeDetailView);
  show(recipePoolView);
  if (user.favoriteRecipes.length === 0) {
    recipePoolView.innerHTML = `
    <h3>Sorry you don't have any favorite recipes yet</h3
    `;
  } else {
    console.log("im if else working");
    recipePool = user.favoriteRecipes;
    console.log(recipePool);
    showRecipePool();
  }
  generateAllTags();
}

function activateAddToRecipesToCookButton(recipeClicked) {
  let addToRecipesToCookButton = document.getElementById("add-to-recipes-to-cook-button");
  let addToCookText = document.getElementById("add-to-cook-text");
  let removeFromCookText = document.getElementById("remove-from-cook-text");

  if (user.recipesToCook.includes(recipeClicked)) {
    resetClassList(addToCookText);
    resetClassList(removeFromCookText);
    hide(addToCookText);
  }

  addToRecipesToCookButton.addEventListener("click", function () {
    if (!user.recipesToCook.includes(recipeClicked)) {
      user.recipesToCook.push(recipeClicked);
      hide(addToCookText);
      show(removeFromCookText);
    } else {
      let indexOfRecipeClicked = user.recipesToCook.indexOf(recipeClicked);
      user.recipesToCook.splice(indexOfRecipeClicked, 1);
      toggle(addToCookText);
      toggle(removeFromCookText);
    }
    console.log(user.recipesToCook);
  });
}

function showQueue() {
  console.log(user);
  hide(recipeDetailView);
  show(recipePoolView);
  if (user.recipesToCook.length === 0) {
    console.log("im empty");
    recipePoolView.innerHTML = `
    <h3>Sorry, you haven't added any recipes to your queue!</h3>
    `;
  } else {
    recipePool = user.recipesToCook;
    console.log(recipePool);
    showRecipePool();
  }
  generateAllTags();
}

// // from raquel
// function showFavRecipesByTag() {
//   if (event.target.type === "checkbox") {
//     if (selectedTags.length > 0) {
//       selectedTags.forEach((tag) => (recipePool = user.filterFavoriteRecipesByTag(tag)));
//     } else {
//       recipePool = user.favoriteRecipes;
//     }
//   }
// }
// UTILITY FUNCTIONS
function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}

function toggle(element) {
  element.classList.toggle("hidden");
}

function resetClassList(element) {
  element.classList = "";
}
