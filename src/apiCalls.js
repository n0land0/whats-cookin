// Your fetch requests will live here!
let userData = [];
let ingredientsData = [];
let recipeData = [];

function fetchUsers() {
  return fetch(
    "https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users"
  ).then(returnedPromise =>
    returnedPromise.json()
  ).then(parsedPromise =>
    // parsedPromise.usersData.forEach(user =>
    //   userData.push(user))
    parsedPromise.usersData
  );
};

function fetchIngredients() {
  return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients").then(returnedPromise =>
    returnedPromise.json()
  ).then(parsedPromise =>
    // parsedPromise.ingredientsData.forEach(ingredient => ingredientsData.push(ingredient)));
    parsedPromise.ingredientsData);
}

function fetchRecipes() {
  return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes").then(returnedPromise =>
    returnedPromise.json()
  ).then(parsedPromise =>
    // parsedPromise.recipeData.forEach(recipe => recipeData.push(recipe)));
    parsedPromise.recipeData);
}

  // console.log(ingredientsData);
  // console.log(recipeData);

  // return getPromiseUsers;
  // return getPromiseIngredients;
  // return getPromiseRecipes;



// Promise.all([promiseUsers, promiseIngredients, promiseRecipes])

export { fetchUsers, fetchIngredients, fetchRecipes, userData, ingredientsData, recipeData };
