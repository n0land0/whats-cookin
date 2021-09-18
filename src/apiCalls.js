/* eslint-disable max-len */
let userData = [];
let ingredientsData = [];
let recipeData = [];

function fetchUsers() {
  // return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users')
  return fetch('http://localhost:3001/api/v1/users')
    .then((returnedPromise) => returnedPromise.json())
    // .then((parsedPromise) => console.log(parsedPromise));
    // .then((parsedPromise) => parsedPromise.usersData);
}

function fetchIngredients() {
  // return fetch(
  // 'https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients'
  // )
  return fetch('http://localhost:3001/api/v1/ingredients')
    .then((returnedPromise) => returnedPromise.json())
    // .then((parsedPromise) => console.log(parsedPromise));
    // .then((parsedPromise) => parsedPromise.ingredientsData);
}

function fetchRecipes() {
  // return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes')
  return fetch('http://localhost:3001/api/v1/recipes')
    .then((returnedPromise) => returnedPromise.json())
    // .then((parsedPromise) => parsedPromise.recipeData);
}

function modifyPantry(userID, ingredientID, ingredientModification) {
  return fetch('http://localhost:3001/api/v1/users', {
    method: 'POST',
    body: JSON.stringify({
      userID,
      ingredientID,
      ingredientModification
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => checkResponse(response))
    .catch(error => console.warn(error))
}

function checkResponse(response) {
  if (!response.ok) {
    throw new Error(`Status: ${response.status} StatusText: ${response.status.text}`)
  }
  return response.json()
}

// export {
//   fetchUsers,
//   fetchIngredients,
//   fetchRecipes,
//   userData,
//   ingredientsData,
//   recipeData,
// };

export {
  fetchUsers,
  fetchIngredients,
  fetchRecipes,
  modifyPantry,
  userData,
  ingredientsData,
  recipeData,
};
