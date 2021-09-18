/* eslint-disable max-len */

function fetchUsers() {
  return fetch('http://localhost:3001/api/v1/users')
    .then((returnedPromise) => returnedPromise.json())
}

function fetchIngredients() {
  return fetch('http://localhost:3001/api/v1/ingredients')
    .then((returnedPromise) => returnedPromise.json())
}

function fetchRecipes() {
  return fetch('http://localhost:3001/api/v1/recipes')
    .then((returnedPromise) => returnedPromise.json())
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

export {
  fetchUsers,
  fetchIngredients,
  fetchRecipes,
  modifyPantry,
};
