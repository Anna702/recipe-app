# Recipe App

A simple React-based web page that allows users to select a recipe from a dropdown and fetch the recipe details. The app uses a Service Worker to cache data for offline usage and improved performance.

You can view the deployed version of the app here: [Recipe App on GitHub Pages](https://Anna702.github.io/recipe-app)

## Table of Contents

- [Features](#features)
- [Setup](#setup)
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

   ```bash
   git clone https://github.com/your-username/recipe-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd recipe-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   The app will automatically open in your browser at `http://localhost:3000`.

## Service Worker

The app uses a Service Worker to cache the recipe data once it's fetched from the API. This improves performance by serving cached data on subsequent requests or when offline.

- The Service Worker caches:
  - API requests to fetch recipe names.
  - Recipe details when a recipe is selected.

To set up the service worker, ensure the following steps are completed:

1. The `service-worker.js` file should be in the `public` folder.
2. Register the service worker in your `index.js` file by adding the following code:

```javascript
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope: ",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
```

3. To unregister the Service Worker (e.g., for debugging), use the following command in the browser console:

```javascript
navigator.serviceWorker.getRegistration().then(function (registration) {
  registration.unregister();
});
```

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Service Workers**: Used for offline caching and improved performance.
- **DummyJSON API**: Used for fetching recipe data.
- **CSS Flexbox**: For a responsive and centered layout.
- **GitHub Pages/Netlify/Vercel**: Options for free deployment.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
