<template>
  <div id="app">
    <!-- <div id="addRecipe">
      <input
        type="text"
        name="Name"
        id="inputRecipeName"
        placeholder="Add new recipe..."
      />
      <button @click="addRecipe">Add recipe</button>
    </div> -->
    <button @click="shuffleDeck">Shuffle</button>
    <div
      v-for="(recipe, index) in recipeDeck.slice(
        Math.max(recipeDeck.length - 5, 1)
      )"
      :key="recipe[0]"
    >
      <RecipeCard :recipe="recipe" :index="index" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import RecipeCard from "./components/RecipeCard.vue"
import store from "@/store"
import BinarySearchTree from "@/lib/binarySearchTree"

export default Vue.extend({
  name: "App",
  components: {
    RecipeCard,
  },
  data() {
    const recipeDeck: any[] = []
    return {
      recipeDeck,
    }
  },
  methods: {
    addRecipe() {
      const recipeNameInput = document.getElementById(
        "inputRecipeName"
      ) as HTMLInputElement
      const recipeName = recipeNameInput.value
      if (!recipeName) {
        alert("No name entered")
        return
      }
      store.dispatch("addRecipe", { name: recipeName })
      recipeNameInput.value = ""
    },
    shuffleDeck() {
      interface Recipes {
        [prop: string]: {
          box: number
          name: string
        }
      }
      const bst = new BinarySearchTree()
      const recipes: Recipes = store.state.recipes as Recipes
      let id: keyof typeof recipes
      for (id in recipes) {
        const order = Math.random() * Math.pow(2, recipes[id].box)
        bst.insert(order, [id, recipes[id]])
      }
      this.recipeDeck = bst.getSortedArr()
    },
  },
  created() {
    store.dispatch("getRecipes")
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  margin-top: 60px;
}
</style>
