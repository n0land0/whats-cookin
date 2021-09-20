# What's Cookin'?

## Abstract

What's Cookin' is a recipe tracking / meal planning application that allows users to view their favorite recipes and plan shopping trips around them. The idea is similar to sites like All Recipes or New York Times Cooking. Users should view a list of recipes, favorite their own recipes, and choose recipes to cook.

## Installation

1. Clone down [client side app](https://github.com/n0land0/whats-cookin) to your local machine.
2. Clone down [local server](https://github.com/turingschool-examples/whats-cookin-api) to a different folder.
3. Run `npm install` on your root folder of the two cloned down repo.
4. In local server folder, run `npm start` to launch local server.
5. In client app folder, run `npm start` and visit the opened port in browser.
6. Start messing around on the page!

## Usage and Demonstration

Please see our demo video [here](https://www.youtube.com/watch?v=aHChq0GsRFE).

## Programming Languages and Dependencies

**This app was developed using:**

- HTML
- CSS
- SCSS
- JavaScript
- NPM
- Mocha and chai testing frameworks
- DOM API
- Fetch API
- Webpack

## Wins and Challenges

**Wins**

- We gained better understanding of asynchronous JS
  - We have used DOM API to some extent in previous projects, but by making extensive use of the fetch API, we had to learn how to control the flow and timing and events
- Our app achieved excellent accessiblity according to the Lighthouse score (97)
- We managed to dry our CSS file using SCSS
- We separate data structure (user info, recipes, ingredients)and DOM manipulations into different folders.

**Challenges**

- Error handling in our fetch POST and GET in response to different types of network errors
- Keeping a smooth project board workflow

## Future Additions

- Be able to tab through drop down menu
- Be able to filter recipes by tags based on search result.
- Display a featured blog post at page load.

## Contributions

**Developers:**

_This app was developed by:_

- [Carlos Gomez](https://github.com/karmacarlos)
- [Bei Zhang](https://github.com/lokiandfengshui)
- [Raquel Hill](https://github.com/Raquelhill)
- [Nolan Caine](https://github.com/n0land0)

_Carlos, Bei, Raquel, and Nolan are students of front-end engineering at the Turing School of Software & Design._

**Project Manager**

- [Nik Seif](https://github.com/niksseif)

[Project spec](https://frontend.turing.edu/projects/What%27sCookin-PartOne.html) and assets provided by the [Turing School of Software & Design](https://turing.edu/).
