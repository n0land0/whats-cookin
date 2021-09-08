# What's Cookin'?

What's Cookin' is a recipe tracking / meal planning application that allows users to view their favorite recipes and plan shopping trips around them. The idea is similar to sites like All Recipes or New York Times Cooking. Users should view a list of recipes, favorite their own recipes, and choose recipes to cook.

## Installation

1. Clone down [this repo](https://github.com/n0land0/whats-cookin) to your local machine.
2. Run `npm install` on your root folder of cloned down repo.
3. Run `npm start` to launch local server.
4. Copy and paste the address following ` Project is running at:` in your browser.
5. Start messing around on the page!

## Usage and Demonstration

**How to use What's Cookin':**

<img width="2560" alt="Screen Shot 2021-09-07 at 9 11 19 PM" src="https://user-images.githubusercontent.com/79823098/132440529-e5cb1a7e-e172-44b1-bd2f-1e11ee51b902.png">

- On initial page load, a random user is generated.
- That user can search recipes by tags, name, and ingredients.
- If a user sees a recipe image they like, they can click on the image to get a detailed view of the recipe that includes ingredients, instructions, and cost.
- The user can then choose to add that recipe to their favorites list or to their cookbook.
- The user can view their lists of favorite recipes or their cookbook recipes and filter those by ingredients that they have in their pantry.

<img width="2560" alt="Screen Shot 2021-09-07 at 9 12 01 PM" src="https://user-images.githubusercontent.com/79823098/132440531-b5a7f83a-7d99-4718-bc6c-0c7e7907a9f0.png">

**Error Handling:**

- If the user tries to view an empty list of their favorite recipes or their cookbook, a modal that prompts the user to search recipes will generate.
- The modal will disappear if the user clicks to 'x' to get out of it.
- API data with formatting errors is screened out to avoid breaking data-dependent functionality.

<img width="2560" alt="Screen Shot 2021-09-07 at 9 12 39 PM" src="https://user-images.githubusercontent.com/79823098/132440540-ec32844a-96b9-4f17-8b0f-d4ae9631e4f3.png">

## Programming Languages and Dependencies

**This app was developed using:**

- HTML
- CSS
- JavaScript
- Fetch API
- Webpack
- Micromodal

## Contributions

**Developers:**

_This app was developed by:_

- [Bei Zhang](https://github.com/lokiandfengshui)
- [Raquel Hill](https://github.com/Raquelhill)
- [Nolan Caine](https://github.com/n0land0)

_Bei, Raquel, and Nolan are students of front-end engineering at the Turing School of Software & Design._

**Project Manager**

- [Nik Seif](https://github.com/niksseif)

[Project spec](https://frontend.turing.edu/projects/What%27sCookin-PartOne.html) and assets provided by the [Turing School of Software & Design](https://turing.edu/).
