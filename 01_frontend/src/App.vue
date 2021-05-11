<template>
  <div id="app">
    <div id="addRecipe">
      <input
        type="text"
        name="Name"
        id="inputRecipeName"
        placeholder="Add new recipe..."
      />
      <button @click="addRecipe">Add recipe</button>
    </div>
    <RecipeCard msg="Hello" />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import RecipeCard from "./components/RecipeCard.vue"
import store from "@/store"

export default Vue.extend({
  name: "App",
  components: {
    RecipeCard,
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
  color: #2c3e50;
  margin-top: 60px;
}
</style>
