<template>
  <div>
    <h1>{{ currentRecipe }}</h1>
    <button @click="yes">Yes</button>
    <button @click="no">No</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { RecipeCollection } from "./utils/Classes/RecipeCollection"

@Options({
  components: {},
})
export default class App extends Vue {
  currentRecipe = "none"
  recipeCollection = new RecipeCollection()

  mounted(): void {
    this.recipeCollection.addRecipe("Nudeln mit Tomatensosse")
    this.recipeCollection.addRecipe("Palak Paneer")
    this.recipeCollection.addRecipe("Shahi Paneer")
    this.recipeCollection.addRecipe("Kartoffeln mit Spinat")
    this.currentRecipe = this.recipeCollection.autoSelectRecipe().name
  }

  yes(): void {
    this.recipeCollection.acceptSelection()
    this.currentRecipe = this.recipeCollection.autoSelectRecipe().name
  }

  no(): void {
    this.recipeCollection.declineSelection()
    this.currentRecipe = this.recipeCollection.autoSelectRecipe().name
  }
}
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
