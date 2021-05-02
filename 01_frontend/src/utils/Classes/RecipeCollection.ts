import { getRandom } from "../utilities"
import { nanoid } from "nanoid"

export interface Recipe {
  _id: string
  name: string
  probability: number
  box: number
}

export class RecipeCollection {
  recipes: Recipe[] = []
  private selectedIndex = 0

  constructor(recipes?: Recipe[]) {
    if (recipes) this.recipes = recipes
  }

  addRecipe(recipe: Recipe | string): void {
    if (typeof recipe === "object") {
      this.recipes.push(recipe)
    } else {
      this.recipes.push({
        _id: nanoid(10),
        name: recipe,
        probability: 1,
        box: 0,
      })
    }
  }

  autoSelectRecipe(): Recipe {
    if (this.recipes.length == 0)
      throw new RangeError("No recipe in collection")

    let sumProbabilities = 0
    this.recipes.forEach((item) => {
      sumProbabilities += item.probability / Math.pow(2, item.box)
    })

    let selectProbability = getRandom(sumProbabilities)

    for (let i = 0; i < this.recipes.length; i++) {
      const item = this.recipes[i]
      selectProbability -= item.probability / Math.pow(2, item.box)
      if (selectProbability <= 0) {
        this.selectedIndex = i
        return item
      }
    }

    throw new Error("This shouldn't be reachable")
  }

  getLastSelectedRecipe(): Recipe {
    return this.recipes[this.selectedIndex]
  }

  declineSelection(): void {
    this.recipes[this.selectedIndex].box++
  }

  acceptSelection(): void {
    if (this.recipes[this.selectedIndex].box > 0)
      this.recipes[this.selectedIndex].box--
  }
}
