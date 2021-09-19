/* eslint-disable max-len */

function fetchUsers() {
  return (
    fetch('http://localhost:3001/api/v1/users')
      // .then((returnedPromise) => returnedPromise.json())
      // .then((response) => checkResponse(response))
      .then((response) => response.json())
    // .catch((error) => displayErrorMessage(error))
  );
}

function fetchIngredients() {
  return (
    fetch('http://localhost:3001/api/v1/ingredients')
      // .then((returnedPromise) => returnedPromise.json())
      .then((response) => checkResponse(response))
  );
}

function fetchRecipes() {
  return (
    fetch('http://localhost:3001/api/v1/recipes')
      // .then((returnedPromise) => returnedPromise.json())
      .then((response) => checkResponse(response))
  );
}

function modifyPantry(userID, ingredientID, ingredientModification) {
  return fetch('http://localhost:3001/api/v1/users', {
    method: 'POST',
    body: JSON.stringify({
      userID,
      ingredientID,
      ingredientModification,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => checkResponse(response))
    .catch((error) => console.warn(error));
}

function checkResponse(response) {
  if (!response.ok) {
    throw new Error(
      `Status: ${response.status} StatusText: ${response.status.text}`
    );
    // recipePoolView.innerHTML = `<h2> We are sorry, you don\'t deserve oven </h2>`;
  }
  return response.json();
}

// function displayErrorMessage(error, recipePoolView) {
//   console.log(error);
//   console.log('recipePoolView');
//   recipePoolView.innerHTML = `<h2> We are sorry, you don\'t deserve oven </h2>`;
// }

export { fetchUsers, fetchIngredients, fetchRecipes, modifyPantry };
