import { Recipe } from "./Classes/RecipeCollection"

export async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch("http://localhost:3000/api/getRecipes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return await result.json()
}
