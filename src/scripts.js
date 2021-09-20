/* eslint-disable max-len */
// IMPORTS

import '../sass/index.scss';

// classes
import RecipeRepository from './classes/RecipeRepository';
import IngredientRepository from './classes/IngredientRepository';
import User from './classes/User';
import Pantry from './classes/Pantry';

// fetch calls & data variables
import { fetchData, modifyPantry } from './apiCalls';
import domUpdates from './domUpdates';

const {
  showAllRecipeBtn,
  showRecipeByTagBtn,
  showFavBtn,
  showCookbookBtn,
  dropBtn,
  showPantryBtn,
  addRecipeFromCookBookModal,
  addRecipeFromFavoritesModal,
  favoriteModal,
  recipesToCookModal,
  closeSpanFavorites,
  closeSpanCookbook,
  recipeTagForm,
  searchInputField,
  searchBtn,
  poolAndSearchView,
  recipePoolView,
  favoriteView,
  cookbookView,
  recipeDetailView,
  pantryView,
  pantryContainer,
} = domUpdates;

// GLOBAL VARIABLES
let recipeRepository;
let ingredientRepository;
let recipePool;
let ingredientPool;
let selectedTags;
let user;
let pantryInstance;
let userData = [];
let ingredientsData = [];
let recipeData = [];

// EVENTLISTENERS

// page load
window.addEventListener('load', getApis);

// view switching
showAllRecipeBtn.addEventListener('click', function () {
  recipePool = recipeRepository.recipes;
  showAllRecipes();
  domUpdates.hide(pantryView);
});

showFavBtn.addEventListener('click', function () {
  recipePool = user.favoriteRecipes;
  showFavorite();
  domUpdates.hide(pantryView);
});

showCookbookBtn.addEventListener('click', function () {
  recipePool = user.recipesToCook;
  showCookbook();
  domUpdates.hide(pantryView);
});

showPantryBtn.addEventListener('click', showPantry);

// tag filtering
recipeTagForm.addEventListener('click', collectTags);

// search
searchBtn.addEventListener('click', function () {
  recipePool = [];
  collectTags();
  generateAllTags();
  searchByName();
  searchByIngredient();
  domUpdates.hide(recipeDetailView);
  domUpdates.show(poolAndSearchView);
  domUpdates.hide(favoriteView);
  domUpdates.hide(cookbookView);
  domUpdates.show(recipePoolView);
  domUpdates.renderAllRecipes(recipePool);
});

// expand individual recipe
recipePoolView.addEventListener('click', showRecipeDetails);
recipePoolView.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    showRecipeDetails(event);
  }
});
favoriteView.addEventListener('click', showRecipeDetails);
favoriteView.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    showRecipeDetails(event);
  }
});
cookbookView.addEventListener('click', showRecipeDetails);
cookbookView.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    showRecipeDetails(event);
  }
});

// modals
addRecipeFromCookBookModal.addEventListener('click', function () {
  favoriteModal.style.display = 'none';
  showAllRecipes();
});

addRecipeFromFavoritesModal.addEventListener('click', function () {
  recipesToCookModal.style.display = 'none';
  showAllRecipes();
});

closeSpanFavorites.addEventListener('click', function () {
  favoriteModal.style.display = 'none';
});

closeSpanCookbook.addEventListener('click', function () {
  recipesToCookModal.style.display = 'none';
});

window.addEventListener('click', function (event) {
  if (event.target == favoriteModal) {
    favoriteModal.style.display = 'none';
  } else if (event.target == recipesToCookModal) {
    recipesToCookModal.style.display = 'none';
  }
});

// FUNCTIONS

// page load - fetch calls and instantiation
function getApis() {
  Promise.all([
    fetchData('users'),
    fetchData('ingredients'),
    fetchData('recipes'),
  ])
    .then((allArrays) => storeData(allArrays))
    .then(() => {
      return showAllRecipes();
    })
    .catch((error) => displayErrorMessage(error, recipePoolView));
}

function displayErrorMessage(error, container) {
  container.innerHTML = `<h2> We are sorry, we are unable to give you oven at the moment. </h2>`;
}

function storeData(arrays) {
  arrays[0].forEach((user) => userData.push(user));
  arrays[1].forEach((ingredient) => ingredientsData.push(ingredient));
  arrays[2].forEach((recipe) => recipeData.push(recipe));
  createUserAndRecipePool();
}

function createUserAndRecipePool() {
  generateRandomUser();
  generateAllRecipes();
  generateAllIngredients();
  generatePantry();
  domUpdates.hide(showRecipeByTagBtn);
  dropBtn.innerText = `Welcome, ${user.name}!`;
}

function generateRandomUser() {
  let randomIndex = Math.floor(Math.random() * userData.length);
  let randomUser = userData[randomIndex];
  user = new User(randomUser);
}

function generateAllRecipes() {
  recipeRepository = new RecipeRepository(recipeData);
  recipeRepository.makeRecipes();
  recipePool = recipeRepository.recipes;
}

function generateAllIngredients() {
  ingredientRepository = new IngredientRepository(ingredientsData);
  ingredientRepository.makeIngredients();
  ingredientPool = ingredientRepository.ingredients;
}

function generatePantry() {
  pantryInstance = new Pantry(user);
}

// data source switching
function showRecipePool() {
  domUpdates.hide(recipeDetailView);
  domUpdates.show(poolAndSearchView);
  domUpdates.hide(pantryView);
  if (!recipePoolView.classList.contains('hidden')) {
    recipePool = recipeRepository.recipes;
    domUpdates.renderAllRecipes(recipePool);
  }
  if (!favoriteView.classList.contains('hidden')) {
    recipePool = user.favoriteRecipes;
    domUpdates.renderFavoriteRecipes(recipePool);
  }
  if (!cookbookView.classList.contains('hidden')) {
    recipePool = user.recipesToCook;
    domUpdates.renderCookbookRecipes(recipePool);
  }
}

// tag filtering
function collectTags() {
  selectedTags = [];
  let checkBoxes = document.querySelectorAll('input[type=checkbox]:checked');
  checkBoxes.forEach((checkedBox) => {
    selectedTags.push(checkedBox.value);
    if (!selectedTags.length) {
      showRecipePool();
    } else {
      showRecipesByTag(selectedTags);
    }
  });
}

function generateAllTags() {
  domUpdates.show(showRecipeByTagBtn);
  let recipeTags = [];
  recipePool.forEach((recipe) => {
    recipeTags.push(recipe.tags);
  });
  let uniqRecipeTags = [...new Set(recipeTags.flat())];
  recipeTagForm.innerHTML = '';
  uniqRecipeTags.forEach((tag) => {
    recipeTagForm.innerHTML += `
      <label for="${tag}">
        <input type="checkbox" class="recipe-tag" id="${tag}" value="${tag}"> ${tag}
      </label>
    `;
  });
}

function showRecipesByTag(selectedTags) {
  if (!recipePoolView.classList.contains('hidden')) {
    recipePool = recipeRepository.returnRecipesByTag(selectedTags);
    domUpdates.renderAllRecipes(recipePool);
  }
  if (!favoriteView.classList.contains('hidden')) {
    recipePool = user.filterRecipesByTag(user.favoriteRecipes, selectedTags);
    domUpdates.renderFavoriteRecipes(recipePool);
  }
  if (!cookbookView.classList.contains('hidden')) {
    recipePool = user.filterRecipesByTag(user.recipesToCook, selectedTags);
    domUpdates.renderCookbookRecipes(recipePool);
  }
}

// search functions
function searchByName() {
  event.preventDefault();
  if (searchInputField.value) {
    recipePool = recipeRepository.returnRecipesByName(searchInputField.value);
  }
  generateAllTags();
}

function searchByIngredient() {
  event.preventDefault();
  let ingredientIds = ingredientRepository.getIngredientId(
    searchInputField.value
  );
  let recipesContainingIngredient =
    recipeRepository.returnRecipesByIngredient(ingredientIds);
  recipesContainingIngredient.forEach((recipe) => {
    if (!recipePool.some((el) => el.name === recipe.name)) {
      recipePool.push(recipe);
    }
  });
  generateAllTags();
}

// expand individual recipe on click
function showRecipeDetails(event) {
  let recipeId = parseInt(event.target.id);
  let recipeClicked = recipePool.find((ele) => ele.id === recipeId);
  let ingredients = recipeClicked.ingredients.map(
    (ingredient, index) =>
      `${ingredient.quantity.amount} ${ingredient.quantity.unit} ${
        recipeClicked.showIngredientsByName()[index]
      }`
  );
  let instructions = recipeClicked.showInstructions();
  let cost = recipeClicked.calculateRecipeCostInDollars();
  domUpdates.hide(poolAndSearchView);
  domUpdates.show(recipeDetailView);
  domUpdates.hide(pantryView);
  domUpdates.renderRecipeDetails(
    recipeDetailView,
    recipeClicked,
    ingredients,
    cost
  );
  let ingredientList = document.querySelector('.ingredient-list');
  ingredients.forEach((ingredient) => {
    ingredientList.innerHTML += `
      <p>${ingredient}</p>
    `;
  });
  instructions.forEach((ele) => {
    let key = Object.keys(ele).toString();
    let instruction = Object.values(ele).toString();
    recipeDetailView.innerHTML += `
    <span class="steps">Step ${key}</span>
    <p>${instruction}</p>
    `;
  });
  activateFaveButton(recipeClicked);
  activateAddToRecipesToCookButton(recipeClicked);
  activateCookingBtn(recipeClicked);
}

// dynamic favorite/cookbook button activation
function activateCookingBtn(recipeClicked) {
  let cookBtn = document.getElementById('cook-button');
  let displayMessage = document.getElementById('display-message');
  let displayMessage2 = document.getElementById('display-message2');
  let buyIngredientsButton = document.getElementById('buy-ingredients');
  cookBtn.addEventListener('click', function () {
    if (pantryInstance.checkIfIsPossibleToCookARecipe(recipeClicked)) {
      executeHappyPath(recipeClicked, displayMessage, cookBtn);
    } else {
      executeSadPath(
        recipeClicked,
        displayMessage2,
        displayMessage,
        buyIngredientsButton,
        cookBtn
      );
    }
  });
}

function executeHappyPath(recipeClicked, displayMessage, cookBtn) {
  displayMessage.innerText = "Success! You've given some oven";
  domUpdates.hide(cookBtn);
  let cookingList = recipeClicked.ingredients.map((ingredient) => {
    return {
      id: ingredient.id,
      amount: -1 * ingredient.quantity.amount,
    };
  });
  modifyPantryAPI(cookingList);
}

function executeSadPath(
  recipeClicked,
  displayMessage2,
  displayMessage,
  buyIngredientsButton,
  cookBtn
) {
  displayMessage.innerText =
    'Oh no! You need more ingredients. Do you want to buy them?';
  let shoppingList = pantryInstance.determineMissingIngAmounts(recipeClicked);
  let displayList = shoppingList.map((ingredient) => {
    return {
      id: ingredient.id,
      name: ingredientPool.find((ing) => ing.id === ingredient.id).name,
      amount: ingredient.missingAmount,
    };
  });
  displayList.forEach((ingList) => {
    displayMessage2.innerHTML += `<p>${ingList.name}: ${ingList.amount} units</p>`;
  });
  domUpdates.show(buyIngredientsButton);
  domUpdates.hide(cookBtn);
  buyIngredientsButton.addEventListener('click', function () {
    modifyPantryAPI(displayList);
    domUpdates.show(cookBtn);
    domUpdates.hide(buyIngredientsButton);
    displayMessage.innerText =
      'Now you have all the ingredients you need to give some oven!';
    displayMessage2.innerHTML = '';
  });
}

function modifyPantryAPI(ingredientList) {
  Promise.all(
    ingredientList.map((ingredient) => {
      return modifyPantry(user.userId, ingredient.id, ingredient.amount);
    })
  ).then(() => {
    fetchData('users')
      .then((users) => users.find((userP) => userP.id === user.userId))
      .then((updatedUser) => {
        let favorites = user.favoriteRecipes;
        let cookbook = user.recipesToCook;
        user = new User(updatedUser);
        user.favoriteRecipes = favorites;
        user.recipesToCook = cookbook;
        pantryInstance = new Pantry(user);
      })
      .catch((error) => displayErrorMessage(error, recipeDetailView));
  });
}
// dynamic favorite/cookbook button activation

function activateFaveButton(recipeClicked) {
  let faveButton = document.getElementById('fave-button');
  let faveText = document.getElementById('fave-text');
  let unFaveText = document.getElementById('unfave-text');
  if (user.favoriteRecipes.includes(recipeClicked)) {
    domUpdates.resetClassList(faveText);
    domUpdates.resetClassList(unFaveText);
    domUpdates.hide(faveText);
  }
  faveButton.addEventListener('click', function () {
    if (!user.favoriteRecipes.includes(recipeClicked)) {
      user.favoriteRecipes.push(recipeClicked);
      domUpdates.hide(faveText);
      domUpdates.show(unFaveText);
    } else {
      let indexOfRecipeClicked = user.favoriteRecipes.indexOf(recipeClicked);
      user.favoriteRecipes.splice(indexOfRecipeClicked, 1);
      domUpdates.toggle(faveText);
      domUpdates.toggle(unFaveText);
    }
  });
}

function activateAddToRecipesToCookButton(recipeClicked) {
  let addToRecipesToCookButton = document.getElementById(
    'add-to-recipes-to-cook-button'
  );
  let addToCookText = document.getElementById('add-to-cook-text');
  let removeFromCookText = document.getElementById('remove-from-cook-text');
  if (user.recipesToCook.includes(recipeClicked)) {
    domUpdates.resetClassList(addToCookText);
    domUpdates.resetClassList(removeFromCookText);
    domUpdates.hide(addToCookText);
  }
  addToRecipesToCookButton.addEventListener('click', function () {
    if (!user.recipesToCook.includes(recipeClicked)) {
      user.recipesToCook.push(recipeClicked);
      domUpdates.hide(addToCookText);
      domUpdates.show(removeFromCookText);
    } else {
      let indexOfRecipeClicked = user.recipesToCook.indexOf(recipeClicked);
      user.recipesToCook.splice(indexOfRecipeClicked, 1);
      domUpdates.toggle(addToCookText);
      domUpdates.toggle(removeFromCookText);
    }
  });
}

// view switching

function showPantry() {
  let pantryForDisplay = pantryInstance.addNamesToPantry(ingredientsData);
  domUpdates.renderPantry(pantryForDisplay);
}

function showAllRecipes() {
  domUpdates.hide(recipeDetailView);
  domUpdates.show(poolAndSearchView);
  domUpdates.hide(favoriteView);
  domUpdates.hide(cookbookView);
  domUpdates.show(recipePoolView);
  showRecipePool();
  generateAllTags();
}

function showFavorite() {
  domUpdates.hide(recipeDetailView);
  domUpdates.show(poolAndSearchView);
  domUpdates.show(favoriteView);
  domUpdates.hide(recipePoolView);
  domUpdates.hide(cookbookView);
  if (!user.favoriteRecipes.length) {
    favoriteView.innerHTML = '';
    favoriteModal.style.display = 'block';
    generateAllTags();
  } else {
    favoriteModal.style.display = 'none';
    showRecipePool();
    generateAllTags();
  }
}

function showCookbook() {
  domUpdates.hide(recipeDetailView);
  domUpdates.show(poolAndSearchView);
  domUpdates.hide(favoriteView);
  domUpdates.hide(recipePoolView);
  domUpdates.show(cookbookView);
  if (!user.recipesToCook.length) {
    cookbookView.innerHTML = '';
    recipesToCookModal.style.display = 'block';
    generateAllTags();
  } else {
    recipesToCookModal.style.display = 'none';
    showRecipePool();
    generateAllTags();
  }
}
