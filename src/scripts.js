import "./styles.css";
import apiCalls from "./apiCalls";
// import RecipeRepository from "../src/classes/RecipeRepository";
// import recipeData from "../src/data/recipes.js";

const showAllRecipeBtn = document.getElementById("show-all-recipes");
const showRecipeByTagBtn = document.getElementById("show-recipe-by-tag");
const searchRecipeByNameBtn = document.getElementById("search-recipe-by-name");

console.log("Hello world");

let recipeRepository = new RecipeRepository(recipeData);
recipeRepository.makeRecipes();
