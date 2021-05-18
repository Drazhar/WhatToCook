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
    <button class="menuBtn" id="refresh" @click="shuffleDeck">
      <i class="fas fa-sync-alt"></i>
    </button>
    <button class="menuBtn" id="btnAddRecipe">
      <i class="far fa-plus-square"></i>
    </button>
    <button class="menuBtn" id="btnCart">
      <p v-if="bookmarksLength > 0">{{ bookmarksLength }}</p>
      <i class="fas fa-shopping-cart"></i>
    </button>

    <div id="cardContainer">
      <transition-group v-bind:name="transitionName">
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
      transitionName: "cards",
    }
  },
  computed: {
    cappedRecipeDeck: function () {
      return this.arrayHead(this.recipeDeck, 50)
    },
    bookmarks: function () {
      return store.state.bookmarks
    },
    bookmarksLength: function () {
      return Object.keys(this.bookmarks).length
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
        if (!(id in this.bookmarks)) {
          const order = Math.random() * Math.pow(2, recipes[id].box)
          bst.insert(order, [id, recipes[id]])
        }
      }
      this.recipeDeck = bst.getSortedArr()
      if (this.recipeDeck.length < 1) {
        if (Object.keys(recipes).length === 0) {
          console.log("No recipes in collection")
        } else {
          console.log("All recipes are already bookmarked")
        }
      }
    },
    arrayHead(arr, count) {
      if (arr.length > count) return arr.slice(Math.max(arr.length - count, 1))
      return arr
    },
    declineRecipe() {
      this.transitionName = "cards"
      const recipe = this.recipeDeck.pop()
      store.dispatch("increaseBox", recipe)
    },
    acceptRecipe() {
      this.transitionName = "altCards"
      const recipe = this.recipeDeck.pop()
      store.dispatch("decreaseBox", recipe)
      store.commit("addRecipeBookmarks", recipe)
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

.menuBtn {
  position: absolute;
  font-size: 30px;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}

#refresh {
  bottom: 20px;
  right: 20px;
}

#btnAddRecipe {
  bottom: 20px;
  left: 20px;
}

#btnCart {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

#btnCart p {
  position: absolute;
  top: -50%;
  right: 0;
  font-size: 12px;
  line-height: 19px;
  text-align: center;
  vertical-align: center;
  color: whitesmoke;
  border-radius: 50%;
  background-color: #ef476f;
  height: 19px;
  width: 19px;
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

.cards,
.altCards {
  transition: all 0.2s;
}

.cards-leave-to {
  transform: translateX(-100%);
}

.altCards-leave-to {
  transform: translate(0, 80vh) scale(0.05);
  opacity: 0.4;
}

.cards-enter,
.altCards-enter {
  opacity: 0;
}
</style>
