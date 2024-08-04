# React + Vite
![Static Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![Static Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Project Name and brief Introduction

This Project is a community oriented event sharing platform called "CommetTo". The main features of this platform would be to create and share events between users along with support for password protected editing.

Support for sharing information about the events like descriptions and time schedules are priorities, with the potential for sharing map and photo information being considered later (will have to revisit the feasibility of these latter points later due to various concerns like security with photo uploads).


## Installing / Getting started

A quick introduction of the minimal setup you need to initalize the dev tool to start building the project.

• npm create vite@latest <br>
• npm install<br>
• npm run dev<br>

### Built With

Our Front-End Tech stack: 
• React <br>
• Javascript <br>
• Tailwind CSS <br>

#### Prerequisites
```shell
dependecies installed:
• "axios" - https://www.npmjs.com/package/axios
• "react" - https://www.npmjs.com/package/react
• "react-dom" - https://www.npmjs.com/package/react-dom
• "tw-elements" -  https://www.npmjs.com/package/tw-elements
• "vite" -  https://www.npmjs.com/package/vite
• "tailwindcss" - https://www.npmjs.com/package/tailwindcss
```
### Setting up Development

Here's a brief intro about what a developer must do in order to start developing the project further:

#### command for setup:

```shell
• git clone https://github.com/FilippoQuattrocchi/CommetTo-Frontend.git
• cd CommetTo-Frontend/
• npm create vite@latest - initialize React-Vite on Vscode to initialize React setup.
• npm install - install primary dependecies dependencies.
• npm run dev - command to fire and run React-Vite on the browser
```

#### chage file setting:<br>
You need to change some variables.<br>

1. Copy .env.example variables 
```
VITE_APP_BASE_URL= 
VITE_APP_PORT =
VITE_APP_LISTS_URL = 
VITE_APP_ONE_EVENT_URL = 
```

2. Create a new .env.local file.

```
for this setup, create a new ".env.local" file and add the following changes to initialize a link between the Front-end and Back-end server, end-points and requests.

VITE_APP_BASE_URL= http://localhost:3100 
VITE_APP_PORT = 4173
VITE_APP_LISTS_URL = http://localhost:3100/all-events/info
VITE_APP_ONE_EVENT_URL = 
```

## File structure in src folder

src<br>
│-App.jsx // Renders the data that is compiled inside App.jsx including all structured components. <br>
│-CSS files // contains all the styling for each file<br>
│-main.jsx // contains "ReactDOM." that renders components  directly to a given DOM element.<br>
└─-components // React components. <br>

```shell
React Components:
• main.jsx- renders compiled component's inside App.jsx.
• App.jsx - encloses useStates and handle functions utilized for compiling the React components.
• Save.jsx - Save button utilized by user to save Event details.
• Login.jsx - Login tab for Initial View utilized for user login.
• Register.jsx - Tab to utilize specifically for unregistered users.
• RightSide.jsx - Component to showcase components and functions found on the right side of the webpage.
• LeftSide.jsx - Component to showcase components and functions found on the left side of the webpage.
• SearchBox.jsx - Utilized for searches or filter events.
• InitialView.jsx - contains the login page as Initial view of our webpage.
• FocusView.jsx -  conntains the main view of the webpage which contains most of the schedule events. 
```
