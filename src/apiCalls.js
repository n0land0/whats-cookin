let userData = [];
let ingredientsData = [];
let recipeData = [];

function fetchUsers() {
  return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users')
    .then((returnedPromise) => returnedPromise.json())
    .then((parsedPromise) => parsedPromise.usersData);
}

function fetchIngredients() {
  return fetch(
    'https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients'
  )
    .then((returnedPromise) => returnedPromise.json())
    .then((parsedPromise) => parsedPromise.ingredientsData);
}

function fetchRecipes() {
  return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes')
    .then((returnedPromise) => returnedPromise.json())
    .then((parsedPromise) => parsedPromise.recipeData);
}

export {
  fetchUsers,
  fetchIngredients,
  fetchRecipes,
  userData,
  ingredientsData,
  recipeData,
};
