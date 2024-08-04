# React + Vite
![Static Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![Static Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)![Static Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Project Name and Brief Introduction

This Project is a community oriented event sharing platform called "CommetTo". The main features of this platform would be to create and share events between users along with support for password protected editing.

Support for sharing information about the events like descriptions and time schedules are priorities, with the potential for sharing map and photo information being considered later (will have to revisit the feasibility of these latter points later due to various concerns like security with photo uploads).


## Installing / Getting started

A quick introduction of the minimal setup you need to initalize the dev tool to start building the project.

```
$ npm create vite@latest <br>
$ npm install<br>
$ npm run dev<br>
```

### Built With

Our Front-End Tech stack: <br>

```
• React <br>
• Javascript <br>
• Tailwind CSS <br>
```

#### Prerequisites

```swift
dependecies installed:
$ "axios" - https://www.npmjs.com/package/axios
$ "react" - https://www.npmjs.com/package/react
$ "react-dom" - https://www.npmjs.com/package/react-dom
$ "tw-elements" -  https://www.npmjs.com/package/tw-elements
$ "vite" -  https://www.npmjs.com/package/vite
$ "tailwindcss" - https://www.npmjs.com/package/tailwindcss
$ "react-router-dom" - https://www.npmjs.com/package/react-router-dom
```
### Setting up Development

Here's a quick guide and run down on how to start developing the project.

#### Quick start:

```
$ git clone https://github.com/FilippoQuattrocchi/CommetTo-Frontend.git
$ cd CommetTo-Frontend/
$ npm create vite@latest - initialize React-Vite on Vscode to initialize React setup.
$ npm install - install primary dependecies dependencies.
$ npm run dev - command to fire and run React-Vite on the browser
```

#### Change the file setting:<br>
You need to change some variables.<br>

1. For Configuration Create a new .env.local file.

```
for this setup, create a new ".env.local" file and add the following changes to initialize a link between the Front-end and Back-end server, end-points and requests.

VITE_APP_BASE_URL= http://localhost:3100 
VITE_APP_PORT = 4173
 
```

## File structure in src folder

src<br>
│-App.jsx // Renders the data that is compiled inside App.jsx including all structured components. <br>
│-CSS files // contains all the styling for each file<br>
│-main.jsx // contains "ReactDOM." that renders components  directly to a given DOM element.<br>
└─components // React components. <br>


### React Components: 

```shell
• main.jsx- renders compiled component's inside App.jsx. <br>
• App.jsx - encloses useStates and handle functions utilized for compiling the React components.<br>
• Save.jsx - Save button utilized by user to save Event details.<br>
• Login.jsx - Login tab for Initial View utilized for user login.<br>
• Register.jsx - Tab to utilize specifically for unregistered users.<br>
• RightSide.jsx - Component to showcase components and functions found on the right side of the webpage.<br>
• LeftSide.jsx - Component to showcase components and functions found on the left side of the webpage.<br>
• SearchBox.jsx - Utilized for searches or filter events.<br>
• InitialView.jsx - contains the login page as Initial view of our webpage.<br>
• FocusView.jsx -  conntains the main view of the webpage which contains most of the schedule events. <br>
```

## Deploying / Publishing

We deployed our project using https://render.com/

Fork the repo and use the button below to deploy this project with ease.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

To deploy manually, see the guide at https://docs.render.com/databases. or https://docs.render.com/deploy-node-express-app


## Style Guide

   Creating clean and readable code is essential and following style guides is one way to ensure our code is always consistent. We utilized both TypeScript in the backend and JavaScript for the frontend. These languages may have specific guidelines but general coding standards apply to all sorts of Programming languages.

    • Utilize proper and meaningful variable names.
    • Name variables and functions to specify intent (e.g handleSumbitData, handlePasswordData ) 
    • Naming enumeration parameter with the singular form of the array or collection. (e.g when looping over an array or collection of events, say for event in events and not for e of events)
    • Break long lines after 80 characters.
    • Delete trailing whitespace.
    • Do not leave commented out code within production code.
    • Avoid deep indentation and inline comments.
    • Use semicolons at the end of each statement.
    • Use const for declaring variables that will never be re-assigned, and let otherwise.
    • Avoid var to declare variables, use let where applicable.
  

## Database

    We utilized PostgreSQL as our database.as a brief summary PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads. 

    In addition we optimized Knex Query Builder to query data directly from server to database and viceversa. https://knexjs.org/

    
### Install 
     ```
     $ brew install postgresql@ <version number> or https://www.postgresql.org/download/

     $ npm install knex --save
     ```
