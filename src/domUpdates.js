//SELECTORS

// buttons;
const showAllRecipeBtn = document.getElementById('show-all-recipes');
const showRecipeByTagBtn = document.getElementById('show-recipe-by-tag');
const showFavBtn = document.getElementById('show-favorites');
const showCookbookBtn = document.getElementById('show-queue');
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
const closeSpanCookbook = document.querySelectorAll('.close')[1];

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

const domUpdates = {
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

  renderRecipeDetails(recipeDetailView, recipeClicked, cost) {
    recipeDetailView.innerHTML = `
      <article class="recipe-detail-container">
        <h3>${recipeClicked.name}</h3>
        <img src=${recipeClicked.image} alt="">
        <div class="container-fave-queue-btns">
          <button id="fave-button">
            <span id="fave-text">🤍</span>
            <span id="unfave-text" class="hidden">❤️</span>
          </button>
          <button id="add-to-recipes-to-cook-button">
            <span id="add-to-cook-text">Add to My Cookbook</span>
            <span id="remove-from-cook-text" class="hidden">Remove from My Cookbook</span>
          </button>
        </div>
        <p id="total-cost">Total cost: <span>$${cost}</span></p>
        <section class="ingredient-list">
          <p>Ingredients:</p>
        </section>
        <button id="cook-button">GIMME OVEN!</button>
        <p id="display-message"></p>
        <section id="display-message2"></section>
        <button id="buy-ingredients" class=" hidden">Buy Ingredients</button>
      </article>
    `;
  },

  renderPantry(pantryForDisplay) {
    pantryView.classList.remove('hidden');
    poolAndSearchView.classList.add('hidden');
    recipeDetailView.classList.add('hidden');
    pantryContainer.innerHTML = '';
    pantryForDisplay.forEach((ingredient) => {
      pantryContainer.innerHTML += `
        <p> ${ingredient.name} Amount: ${ingredient.amount}</p>
      `;
    });
  },

  show(element) {
    element.classList.remove('hidden');
  },

  hide(element) {
    element.classList.add('hidden');
  },

  toggle(element) {
    element.classList.toggle('hidden');
  },

  resetClassList(element) {
    element.classList = '';
  },

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
};

export default domUpdates;
