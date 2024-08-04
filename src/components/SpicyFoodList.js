import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");

  // Filter the foods based on the filterBy state
  const foodToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    }else{
      return food.cuisine === filterBy;
    }
  });

  // Handle the filterBy change event
  function handleFilterByChange(event) {
    setFilterBy(event.target.value); // Update the filterBy state
    return (
  <select name="filter" onChange={handleFilterByChange}>
    <option value="All">All</option>
    <option value="American">American</option>
    <option value="Sichuan">Sichuan</option>
    <option value="Thai">Thai</option>
    <option value="Mexican">Mexican</option>
  </select>
    )
  }

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    setFoods([...foods, newFood]);
    // console.log(newFood);
  }

  function handleLiClick(id) {
    // const newFoods = foods.filter((food) => food.id !== id);

    // Create a copy of the foods array
    const newFoodsArray = foods.map((food) => {
      if (food.id === id) { // If the id matches the id of the clicked food
        return { ...food, heatLevel: food.heatLevel + 1 }; // Increment the heat level by 1
      } else {
        // Return the original food object
        return food;
      }
    });
    setFoods(newFoodsArray);
  }

  const foodList = foodToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));


  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select name="filter" onChange={handleFilterByChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
