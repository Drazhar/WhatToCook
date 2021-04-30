<template>
  <h1>{{ currentRecipe }}</h1>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { MongoConnection } from "./utils/Classes/MongoConnection"
import { RecipeCollection } from "./utils/Classes/RecipeCollection"

@Options({
  components: {},
})
export default class App extends Vue {
  currentRecipe = "none"

  mounted(): void {
    const mC = new MongoConnection("WhatToEat")
    mC.getDocuments().then((value) => {
      const rC = new RecipeCollection(value)
    })
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
