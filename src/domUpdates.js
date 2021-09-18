//SELECTORS

// buttons;
const showAllRecipeBtn = document.getElementById('show-all-recipes');
const showRecipeByTagBtn = document.getElementById('show-recipe-by-tag');
const showFavBtn = document.getElementById('show-favorites');
const showQueueBtn = document.getElementById('show-queue');
// const dropBtn = document.querySelector('.dropbtn');
const dropBtn = document.querySelector('.dropdown-button');
const showPantryBtn = document.getElementById('show-pantry');

// modals
const addRecipeFromCookBookModal = document.getElementById(
  'show-all-recipes-cookbook'
);
const addRecipeFromFavoritesModal = document.getElementById(
  'show-all-recipes-favorites'
);
const favoriteModal = document.getElementById('favorite-recipe-modal');
const recipesToCookModal = document.getElementById('recipes-to-cook-modal');
const closeSpanFavorites = document.querySelectorAll('.close')[0];
const closeSpanQueue = document.querySelectorAll('.close')[1];

// search & filter
const recipeTagForm = document.getElementById('recipe-tag-form');
const searchInputField = document.getElementById('search-input-field');
const searchBtn = document.getElementById('search-button');

// containers
const poolAndSearchView = document.getElementById('pool-and-search-parent');
const recipePoolView = document.querySelector('.recipe-pool-view');
const favoriteView = document.querySelector('.favorite-view');
const cookbookView = document.querySelector('.cookbook-view');
const recipeDetailView = document.querySelector('.recipe-detail-view');
const pantryView = document.querySelector('.pantry-view');
const pantryContainer = document.getElementById('pantry-container');
// const recipeContainer = document.getElementById('recipe-container');

const domUpdates = {
  // allRecipesDomUpdate() {
  renderAllRecipes(recipePool) {
    recipePoolView.innerHTML = '';
    recipePool.forEach((recipe) => {
      recipePoolView.innerHTML += `
          <article class="recipe-card" id="${recipe.id}">
            <img src=${recipe.image} alt="">
            <p>${recipe.name}</p>
          </article>
        `;
    });
  },

  // favoritesDomUpdate() {
  renderFavoriteRecipes(recipePool) {
    favoriteView.innerHTML = '';
    recipePool.forEach((recipe) => {
      favoriteView.innerHTML += `
          <article class="recipe-card" id="${recipe.id}">
            <img src=${recipe.image} alt="">
            <p>${recipe.name}</p>
          </article>
        `;
    });
  },

  // cookbookDomUpdate() {
  renderCookbookRecipes(recipePool) {
    cookbookView.innerHTML = '';
    recipePool.forEach((recipe) => {
      cookbookView.innerHTML += `
          <article class="recipe-card" id="${recipe.id}">
            <img src=${recipe.image} alt="">
            <p>${recipe.name}</p>
          </article>
        `;
    });
  },

  showAllRecipeBtn,
  showRecipeByTagBtn,
  showFavBtn,
  showQueueBtn,
  dropBtn,
  showPantryBtn,
  addRecipeFromCookBookModal,
  addRecipeFromFavoritesModal,
  favoriteModal,
  recipesToCookModal,
  closeSpanFavorites,
  closeSpanQueue,
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
};

export default domUpdates;
