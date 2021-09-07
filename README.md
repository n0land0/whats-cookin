# What's Cookin'?

What's Cookin' is a recipe tracking / meal planning application that allows users to view their favorite recipes and plan shopping trips around them. The idea is similar to sites like All Recipes or New York Times Cooking. Users should view a list of recipes, favorite their own recipes, and choose recipes to cook.

## Installation

[Click here to access Whats Cookin'.](https://github.com/n0land0/whats-cookin)

## Usage and Demonstration

**How to use What's Cookin':**

- On initial page load, no previous activities will be listed.
- To add an activity, the user must select a category: Study, Meditate, or Exercise.
  - Once a category has been selected, the user must add a brief activity description, as well as a time value of minutes and seconds.
- Once the form has been filled, clicking 'Start Activity' will take the user to a page with a timer.
  - Clicking 'Start' will make the timer run down until the task has been completed.
- Once the timer reaches 0:00, a 'Log Activity' button will appear which will return the user to the form view.
  - A summary of the completed activity in the form of a miniature card will be added to the Past Activities section on the right side of the page.

![recording (6)](https://user-images.githubusercontent.com/82003147/128073117-51d7538e-037a-42b7-8df8-9a46c72e1b40.gif)

**Error Handling:**

If the user tries to view an empty list of their favorite recipes or their cookbook, a modal that prompts the user to search recipes will generate.

- The modal will disappear if the user clicks to 'x' to get out of it.

![recording (7)](https://user-images.githubusercontent.com/82003147/128073130-549e8ccb-f5b5-4d09-8900-e544962c7224.gif)

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

Project spec and assets provided by the [Turing School of Software & Design](https://turing.edu/).
