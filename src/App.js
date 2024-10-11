import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state for recipes

  // Fetch recipe names once the component mounts
  useEffect(() => {
    fetch("https://dummyjson.com/recipes?select=name")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.recipes); // Set the recipes data
        setIsLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setIsLoading(false); // Stop loading even on error
      });
  }, []); // Run once on mount

  // Handle the selection of a recipe from the dropdown
  const handleRecipeChange = (event) => {
    const recipeId = event.target.value;
    fetch(`https://dummyjson.com/recipes/${recipeId}`)
      .then((response) => response.json())
      .then((data) => setSelectedRecipe(data))
      .catch((error) => console.error("Error fetching recipe details:", error));
  };

  return (
    <div className="App">
      <h1>Recipe App</h1>

      {/* Display a loading message until recipes are fetched */}
      {isLoading ? (
        <p>Loading recipes...</p>
      ) : (
        <select
          className="recipe-select"
          defaultValue=""
          onChange={handleRecipeChange}
        >
          <option value="" disabled>
            Select a recipe
          </option>
          {recipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>
              {recipe.name}
            </option>
          ))}
        </select>
      )}

      {/* Display the recipe details once a recipe is selected */}
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
    </div>
  );
}

export default App;
