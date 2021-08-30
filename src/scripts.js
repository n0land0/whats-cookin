import "./styles.css";
import apiCalls from "./apiCalls";
import RecipeRepository from "./classes/RecipeRepository";
import recipeData from "./data/recipes.js";

const showAllRecipeBtn = document.getElementById("show-all-recipes");
const showRecipeByTagBtn = document.getElementById("show-recipe-by-tag");
const searchRecipeByNameBtn = document.getElementById("search-recipe-by-name");
const recipeContainer = document.getElementById("recipe-container");
var recipePool;

window.addEventListener("load", generateRecipes);
showAllRecipeBtn.addEventListener("click", showAllRecipes);

function generateRecipes() {
  event.preventDefault();
  let recipeRepository = new RecipeRepository(recipeData);
  recipeRepository.makeRecipes();
  recipePool = recipeRepository.recipes;
  //   console.log(recipePool);
}

// console.log(recipePool);

function showAllRecipes() {
  console.log(recipePool);
  // appendChild to recipe container - card for each recipe w/ pic & name
}
