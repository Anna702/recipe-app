import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // To manage loading state

  // Fetch the recipe list only once when the component mounts
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetch("https://dummyjson.com/recipes?select=name")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setRecipes(data.recipes);
          setIsLoading(false); // Data fetching complete
        }
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setIsLoading(false); // Handle error
      });

    // Cleanup function to prevent setting state if component unmounts
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array ensures this runs only once

  // Handle the selection of a recipe
  const handleRecipeChange = (event) => {
    const recipeId = event.target.value;
    fetch(`https://dummyjson.com/recipes/${recipeId}`)
      .then((response) => response.json())
      .then((data) => setSelectedRecipe(data))
      .catch((error) => console.error("Error fetching recipe details:", error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Recipe App</h1>

        {/* Dropdown to select a recipe */}
        {isLoading ? (
          <p>Loading recipes...</p>
        ) : (
          <select
            onChange={handleRecipeChange}
            defaultValue=""
            className="recipe-select"
          >
            <option value="" disabled>
              Select a recipe
            </option>
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <option key={recipe.id} value={recipe.id}>
                  {recipe.name}
                </option>
              ))
            ) : (
              <option disabled>No recipes available</option>
            )}
          </select>
        )}

        {/* Display selected recipe details */}
        {selectedRecipe && (
          <div className="recipe-details">
            <h2>{selectedRecipe.name}</h2>
            <p>
              <strong>Ingredients:</strong>{" "}
              {selectedRecipe.ingredients.join(", ")}
            </p>
            <p>
              <strong>Instructions:</strong> {selectedRecipe.instructions}
            </p>
            <p>
              <strong>Difficulty:</strong> {selectedRecipe.difficulty}
            </p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
