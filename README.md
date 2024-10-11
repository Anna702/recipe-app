
# Recipe App

A simple React-based web page that allows users to select a recipe from a dropdown and fetch the recipe details. The app uses a Service Worker to cache data for offline usage and improved performance.

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [Deployment](#deployment)
- [Service Worker](#service-worker)
- [Technologies Used](#technologies-used)

## Features

- Dropdown menu to select recipes fetched from the DummyJSON API.
- Displays detailed information about the selected recipe, including ingredients, instructions, and difficulty.
- Service Worker for caching recipe data, ensuring that previously fetched recipes are available offline.
- Clean and responsive design with centered layout and a gradient background.

## Setup

To get a local copy of this project up and running, follow these steps:

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (Node package manager)

### Installation

1. Clone the repository:

   \`\`\`bash
   git clone https://github.com/your-username/recipe-app.git
   \`\`\`

2. Navigate to the project directory:

   \`\`\`bash
   cd recipe-app
   \`\`\`

3. Install the dependencies:

   \`\`\`bash
   npm install
   \`\`\`

4. Start the development server:

   \`\`\`bash
   npm start
   \`\`\`

   The app will automatically open in your browser at \`http://localhost:3000\`.

## Deployment

This app can be deployed on platforms like GitHub Pages, Netlify, or Vercel. Below are the steps to deploy on GitHub Pages:

1. Install the \`gh-pages\` package:

   \`\`\`bash
   npm install gh-pages --save-dev
   \`\`\`

2. Add the following scripts to your \`package.json\`:

   \`\`\`json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   \`\`\`

3. Add a \`homepage\` field to your \`package.json\`, where \`your-username\` is your GitHub username and \`recipe-app\` is your repository name:

   \`\`\`json
   {
     "name": "recipe-app",
     "version": "1.0.0",
     "homepage": "https://your-username.github.io/recipe-app"
   }
   \`\`\`

4. Deploy to GitHub Pages:

   \`\`\`bash
   npm run deploy
   \`\`\`

## Service Worker

The app uses a Service Worker to cache the recipe data once it's fetched from the API. This improves performance by serving cached data on subsequent requests or when offline.

- The Service Worker caches:
  - API requests to fetch recipe names.
  - Recipe details when a recipe is selected.
  
To unregister the Service Worker (e.g., for debugging), use the following command in the browser console:

\`\`\`javascript
navigator.serviceWorker.getRegistration().then(function(registration) {
  registration.unregister();
});
\`\`\`

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Service Workers**: Used for offline caching and improved performance.
- **DummyJSON API**: Used for fetching recipe data.
- **CSS Flexbox**: For a responsive and centered layout.
- **GitHub Pages/Netlify/Vercel**: Options for free deployment.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
