# Project 10: WTWR

## Intro

This is a project that renders cards on the end user's screen depending on their geographical location and atmospherical temperature.

## Updates

At the start of the project, I implemented React in it with the use of the build tool Vite. Organized all of the initial file structure according to what the design
was specifying.  
Then I started to work on the different components and their stylings, ensuring that values are very flexible.

## Features

The project makes use of the React framework as mentioned previously, it uses the project build tool Vite to bundle all of the project together.

The project contains a src directory containing all of the project's structure, except for the favicon, which is in the public directory.

Inside the assets directory there are all the images being used throughout the project, and inside the components directory all the stylesheets and JSX files
are found defining the whole structure and style of the page.  
The utils directory contains two files: `constants.js` and `weatherApi.js`.

`constants.js` contains all the default and static element specifications, as to what their source url, alternative texts and other default attributes are.
`weatherApi.js` is handling all of the API requests, retrieving data from the API and filtering that data, making it ready to use across all of the components in the project.

The most important component is `App.jsx`. It controls the state of the elements according to the data retrieved from the API.

## More Information

Link to Project on GitHub Pages
[GitHub Pages](https://nikovds.github.io/se_project_react/)
