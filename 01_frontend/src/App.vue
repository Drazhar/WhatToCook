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
    <button id="refresh" @click="shuffleDeck">
      <i class="fas fa-sync-alt"></i>
    </button>

    <div id="cardContainer">
      <transition-group name="cards">
        <div
          class="cards"
          v-for="(recipe, index) in cappedRecipeDeck"
          :key="recipe[0]"
        >
          <RecipeCard
            :recipe="recipe"
            :index="index"
            :count="cappedRecipeDeck.length"
          />
        </div>
      </transition-group>
    </div>
    <div v-if="cappedRecipeDeck.length > 0" id="choiceButtons">
      <button @click="acceptRecipe" style="background-color: #118ab2">
        Yes
      </button>
      <button @click="declineRecipe">No</button>
    </div>
  </div>
</template>

<script>
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
    const recipeDeck = []
    return {
      recipeDeck,
    }
  },
  computed: {
    cappedRecipeDeck: function () {
      return this.arrayHead(this.recipeDeck, 50)
    },
  },
  methods: {
    addRecipe() {
      const recipeNameInput = document.getElementById("inputRecipeName")
      const recipeName = recipeNameInput.value
      if (!recipeName) {
        alert("No name entered")
        return
      }
      store.dispatch("addRecipe", { name: recipeName })
      recipeNameInput.value = ""
    },
    shuffleDeck() {
      const bst = new BinarySearchTree()
      const recipes = store.state.recipes
      for (const id in recipes) {
        const order = Math.random() * Math.pow(2, recipes[id].box)
        bst.insert(order, [id, recipes[id]])
      }
      this.recipeDeck = bst.getSortedArr()
      console.log(this.recipeDeck.length)
    },
    arrayHead(arr, count) {
      if (arr.length > count) return arr.slice(Math.max(arr.length - count, 1))
      return arr
    },
    declineRecipe() {
      const recipe = this.recipeDeck.pop()
      store.dispatch("increaseBox", recipe)
    },
    acceptRecipe() {
      const recipe = this.recipeDeck.pop()
      store.dispatch("decreaseBox", recipe)
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
  display: flex;
  flex-direction: column;
}

#cardContainer {
  position: relative;
  height: 70vh;
}

#choiceButtons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 10;
}

#refresh {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 30px;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}

#choiceButtons button {
  margin: 10px 40px;
  width: 70px;
  height: 43px;
  color: whitesmoke;
  font-weight: 700;
  background-color: #ef476f;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  box-shadow: 1px 4px 8px 1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.cards {
  transition: all 0.2s;
}

.cards-leave-to {
  transform: translateX(-100%);
}

.cards-enter {
  opacity: 0;
}
</style>
