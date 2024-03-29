# Sharist Front End

Welcome! You can view the current `master` branch deployment at https://sharist.netlify.app/.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

The `npm start` script will run the front end server on [localhost:8000](localhost:8000), but the script is configured to automatically open your browser and navigate to https://sharits.localhost.

While working with [localhost:8000](localhost:8000) is fine for front-end only development , we recommend you follow the steps [here to setup reverse proxy](https://github.com/Sharist/miscellaneous/blob/master/docs/reverse-proxy.md) and local SSL certificates. This is needed to test with the [backend](https://github.com/Sharist/backend).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Opens https://sharist.localhost to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

During development, ask [Sam Ling](https://github.com/thling) for Google Maps API key. Please note that this key is restricted to local use.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.s

## Visual Studio Code

We highly recommend using Visual Studio Code because of the deep integration between the IDE and React/TypeScript.

### Useful extensions

- [`Prettier`](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - helps keeping code clean and well-formatted.
- [`vscode-styled-components`](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components) - syntax highlighting for Styled Components.

### Useful snippets

Here are a few useful snippets that will make developing easier. To add these snippets:

1. Open Visual Studio Code
2. Press `Ctrl + Shift + P` (Windows/Linux) or `Cmd + Shift + P` (MacOS)
3. Type `Preferences: Configure User Snippets` and press Enter
4. Type `typescriptreact.json` and press Enter - a new editor tab should pop up with some comments
5. Copy and paste the following snippet into the file

```json
{
  "Import React statement": {
    "prefix": "import react",
    "body": "import React from 'react';\n",
    "description": "Add 'import React' statement"
  },
  "Styled component with theme": {
    "prefix": "styled theme",
    "body": ["styled.$1`", "  ${({ theme: { $2 } }) => css`", "    ", "  `}`;"],
    "description": "Add snippets to destructure `theme` prop. You will need to import `css` from `styled-components`."
  }
}
```

Now whenever you are in a `.tsx` file (not `.ts`), you will have access to the above snippet when you type the corresponding prefix and press Tab or Enter.
