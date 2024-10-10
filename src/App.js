import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Функция для получения списка рецептов с API
  useEffect(() => {
    fetch('https://dummyjson.com/recipes?select=name')
      .then(response => response.json())
      .then(data => setRecipes(data.recipes))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  // Функция для получения информации о выбранном рецепте
  const handleRecipeChange = (event) => {
    const recipeId = event.target.value;
    fetch(`https://dummyjson.com/recipes/${recipeId}`)
      .then(response => response.json())
      .then(data => setSelectedRecipe(data))
      .catch(error => console.error('Error fetching recipe details:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Recipe App</h1>

        {/* Выпадающее меню для выбора рецепта */}
        <select onChange={handleRecipeChange}>
          <option value="">Select a recipe</option>
          {recipes.map(recipe => (
            <option key={recipe.id} value={recipe.id}>
              {recipe.name}
            </option>
          ))}
        </select>

        {/* Отображение деталей выбранного рецепта */}
        {selectedRecipe && (
          <div className="recipe-details">
            <h2>{selectedRecipe.name}</h2>
            <p><strong>Ingredients:</strong> {selectedRecipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> {selectedRecipe.instructions}</p>
            <p><strong>Difficulty:</strong> {selectedRecipe.difficulty}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;