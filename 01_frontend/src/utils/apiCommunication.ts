import { Recipe } from "./Classes/RecipeCollection"

export async function getRecipes(): Promise<Recipe[]> {
  return fetch("http://localhost:3000/api/getRecipes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
}
