# WAYMARK REACT COVID APP

This app was created using React Create app as an assessment for a potential position on the waymark engineering team.

## How to run

1. `git clone` the repo
2. `yarn install`
3. `yarn start`
4. The app should be available on `http://localhost:3000` from a browser.

## Basic info

    - Basic design (requirements specified not to worry about design)
    - Used Create React App
    - Calls The COVID Tracking Project api.
    - Uses Typescript
    - Uses Chart.js
    - Used Material UI
    - Note I had some trouble with my tests/environment... so the tests are a little lackluster.

## Overview

This is a single page React implementation of a COVID-19 Dashboard. The app allows a user to see data throughout the COVID-19 pandemic. The user can select up to five states from a pre-selected list to be available at a time. When a state is added to the dashboard the user will see on the right side a line chart displaying the dates and total cases/hospitalizations, with the ability to switch between them. On the left the user will be able to see statistics based on a certain date. The statistics are only populated when the use provides the component with a specific date. The user can accomplish this by hovering over a specific date in the line chart.

In the header of the app the user can add five states at time. When a state is added a box and button appears in the header representing a selection. The user can remove the state from the dashboard by clicking the remove button. The user can also rearrange the order of the states in the dashboard by dragging the state box and button to the left or right (depending if they want to move the state up or down on the page).

## Requirements

- Add new states to the dashboard (5 states max)
- Rearrange the order of the states in the dashboard (ie. the dashboard shows
Pennsylvania first, but I want to be able to change it to show New York first)
- Remove a state from the dashboard
- See the historical data for a state in bar or line graph form (feel free to use a library or
create your own solution)
    - The graph should be able to toggle between total case count and total
hospitalizations
    - The X-axis should be the date and the Y-axis should be the total case count or
total hospitalizations, depending on the graph toggle
- See the details of a given day when hovered. These details should show in the container
to the left of the graph, as shown in the wireframes below. Data points to show, if the
state has that data:
    - Total PCR tests
    - Total recovered count
    - Current ICU count
    - Current on ventilator count
    - Current hospitalization count
    - NICE TO HAVE: A rolling 7-day average of new cases


## API Information

The app is using an api to display covid-19 data. The api is provided for free from The COVID Tracking Project. 

https://covidtracking.com/data/api

Main endpoint: https://api.covidtracking.com/v2/states/[STATE_CODE]/daily/simple.json

Available States: 
● Tennessee - TN
● Washington - WA
● Maryland - MD
● Ohio - OH
● Florida - FL
● Arizona - AZ
● Wisconsin - WI
● Rhode Island - RI
● Georgia - GA
● Kentucky - KY

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


### `yarn clean`

Will delete `node_modules` and `yarn.lock` file
Must run `yarn install` after.

### Author
Chris Geleta
cgeleta620@gmail.com
