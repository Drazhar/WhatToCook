import "jest"
import { Recipe, RecipeCollection } from "@/utils/Classes/RecipeCollection"

describe("RecipeCollection", () => {
  let rC: RecipeCollection
  beforeEach(() => {
    rC = new RecipeCollection()
  })

  describe("Basic", () => {
    test("Initializes", () => {
      expect(rC).toBeTruthy()
    })

    test("Initializes empty", () => {
      expect(rC.recipes.length).toBe(0)
    })

    test("Try to select without recipes throws", () => {
      expect(() => rC.autoSelectRecipe()).toThrow(RangeError)
    })
  })

  describe("Advanced", () => {
    beforeEach(() => {
      rC.addRecipe("Nudeln mit Tomatensosse")
      rC.addRecipe("Palak Paneer")
      rC.addRecipe("Shahi Paneer")
      rC.addRecipe("Kartoffeln mit Spinat")
    })

    test("Add recipe", () => {
      expect(rC.recipes.length).toBe(4)
    })

    test("Add recipe with object", () => {
      rC.addRecipe({
        _id: "anyID",
        name: "Test recipe",
        probability: 1,
        box: 0,
      })
      expect(rC.recipes.length).toBe(5)
      // expect(rC.recipes[4].name).toBe("Test r/*  */ecipe")
    })

    test("Select a random one", () => {
      expect(rC.autoSelectRecipe().name).toBeTruthy()
    })

    test("Last Selected returns the last recipe", () => {
      expect(rC.getLastSelectedRecipe()).toBe(rC.recipes[0])
    })

    test("Last Selected returns the last recipe after autoSelect", () => {
      const selectedRecipe = rC.autoSelectRecipe()
      expect(rC.getLastSelectedRecipe()).toBe(selectedRecipe)
    })

    test("If recipe is declined, it should appear less often", () => {
      const count: any = {}
      const unwantedRecipe = rC.autoSelectRecipe()
      rC.declineSelection()
      for (let i = 0; i < 1000; i++) {
        const selectedRecipe = rC.autoSelectRecipe()
        if (selectedRecipe.name == unwantedRecipe.name) rC.declineSelection()
        if (selectedRecipe.name in count) count[selectedRecipe.name]++
        else count[selectedRecipe.name] = 1
      }
      expect(count[unwantedRecipe.name]).toBeLessThan(10)
    })

    test("Decline recipe go to next box, accept it afterwards moves it up again and removes empty boxes at the end", () => {
      const exampleRecipe = rC.autoSelectRecipe()
      rC.declineSelection()
      expect(rC.getLastSelectedRecipe().box).toBe(1)
      let recipeIsFound = false
      while (!recipeIsFound) {
        const currentRecipe = rC.autoSelectRecipe()
        if (currentRecipe == exampleRecipe) recipeIsFound = true
      }
      rC.acceptSelection()
      expect(rC.getLastSelectedRecipe().box).toBe(0)
    })
  })
})
