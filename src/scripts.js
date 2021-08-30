import "./styles.css";
import apiCalls from "./apiCalls";
import RecipeRepository from "./classes/RecipeRepository";
import recipeData from "./data/recipes.js";

const showAllRecipeBtn = document.getElementById("show-all-recipes");
const showRecipeByTagBtn = document.getElementById("show-recipe-by-tag");
const searchRecipeByNameBtn = document.getElementById("search-recipe-by-name");
const recipeContainer = document.getElementById("recipe-container");
const recipeTagCheckboxes = document.getElementById("recipe-tag-checkboxes");
var recipePool;

window.addEventListener("load", function() {
  generateRecipes();
  generateTags();
})
  
showAllRecipeBtn.addEventListener("click", showAllRecipes);

function generateRecipes() {
  event.preventDefault();
  let recipeRepository = new RecipeRepository(recipeData);
  recipeRepository.makeRecipes();
  recipePool = recipeRepository.recipes;
  // generateTags();
}

function generateTags() {
  let recipeTags = [];
  recipeData.forEach(recipe => {
    recipeTags.push(recipe.tags)
  })
  let tagSet = [...new Set(recipeTags.flat())];
  tagSet.forEach(tag => {
    recipeTagCheckboxes.innerHTML += `
      <input type="checkbox" id="${tag}" value="${tag}></input>
      <label for="${tag}">${tag}</label>
    `
  })
}

function showAllRecipes() {
  // console.log(recipePool);
  // appendChild to recipe container - card for each recipe w/ pic & name
  
  // recipeContainer.appendChild();
  recipeData.forEach(recipe => {
    recipeContainer.innerHTML += `
      <article>
        <img src=${recipe.image}>
        <p>${recipe.name}</p>
      </article>
    `
  })
}

