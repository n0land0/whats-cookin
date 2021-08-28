# What's Cookin'?

Intention Timer is a web app that allows users to create tasks, set a timer for the task's duration, and log completed activities.

## Installation

Intention Timer requires no installation. All features are contained within the web app, which leverages local storage to keep track of the user's activities across visits.

[Click here to access Intention Timer.](https://nzambonivergara.github.io/intention-timer/)

## Usage and Demonstration

**How to use Intention Timer:**

- On initial page load, no previous activities will be listed.
- To add an activity, the user must select a category: Study, Meditate, or Exercise.
  - Once a category has been selected, the user must add a brief activity description, as well as a time value of minutes and seconds.
  
- Once the form has been filled, clicking 'Start Activity' will take the user to a page with a timer.
  - Clicking 'Start' will make the timer run down until the task has been completed.
  
- Once the timer reaches 0:00, a 'Log Activity' button will appear which will return the user to the form view.
  - A summary of the completed activity in the form of a miniature card will be added to the Past Activities section on the right side of the page.

![recording (6)](https://user-images.githubusercontent.com/82003147/128073117-51d7538e-037a-42b7-8df8-9a46c72e1b40.gif)


**Error Handling:**

If the user does not enter a category, description, or a time value, an error message will display beneath the empty section(s), prompting the user to complete the form.

- These messages will disappear as soon as a category is selected, or as soon as the user types in a field.

![recording (7)](https://user-images.githubusercontent.com/82003147/128073130-549e8ccb-f5b5-4d09-8900-e544962c7224.gif)

## Programming Languages and Dependencies

**This app was developed using:**

- HTML
- CSS
- JavaScript
  - Local Storage

## Contributions

**Developers:**

_This app was developed by:_

- [Bei Zhang](https://github.com/lokiandfengshui)
- [Raquel Hill](https://github.com/Raquelhill)
- [Nolan Caine](https://github.com/n0land0)

_Bei, Raquel, and Nolan are students of front-end engineering at the Turing School of Software & Design._

Project spec and assets provided by the [Turing School of Software & Design](https://turing.edu/).

