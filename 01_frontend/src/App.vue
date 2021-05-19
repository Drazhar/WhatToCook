<template>
  <div id="app">
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
    <div class="bottomMenu">
      <button @click="toggleShowAddRecipe" class="menuBtn">
        <i class="far fa-plus-square"></i>
      </button>
      <button @click="toggleShowBookmarks" class="menuBtn" id="btnCart">
        <p v-if="bookmarksLength > 0">{{ bookmarksLength }}</p>
        <i class="fas fa-shopping-cart"></i>
      </button>
      <button class="menuBtn" @click="shuffleDeck">
        <i class="fas fa-sync-alt"></i>
      </button>
    </div>
    <Bookmarks v-if="showBookmarks" />
    <AddRecipe v-if="showAddRecipe" />
  </div>
</template>

<script>
import Vue from "vue"
import RecipeCard from "./components/RecipeCard.vue"
import Bookmarks from "./components/Bookmarks.vue"
import AddRecipe from "./components/AddRecipe.vue"
import store from "@/store"
import BinarySearchTree from "@/lib/binarySearchTree"

export default Vue.extend({
  name: "App",
  components: {
    RecipeCard,
    Bookmarks,
    AddRecipe,
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
    bookmarks: () => {
      return store.state.bookmarks
    },
    bookmarksLength: function () {
      return Object.keys(this.bookmarks).length
    },
    showBookmarks: () => {
      return store.state.showBookmarks
    },
    showAddRecipe: () => {
      return store.state.showAddRecipe
    },
  },
  methods: {
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
      if (this.recipeDeck.length === 0) this.shuffleDeck()
      store.dispatch("increaseBox", recipe)
    },
    acceptRecipe() {
      this.transitionName = "altCards"
      const recipe = this.recipeDeck.pop()
      if (this.recipeDeck.length === 0) this.shuffleDeck()
      store.dispatch("decreaseBox", recipe)
      store.commit("addRecipeBookmarks", recipe)
    },
    toggleShowBookmarks() {
      store.commit("toggleShowBookmarks")
    },
    toggleShowAddRecipe() {
      store.commit("toggleShowAddRecipe")
    },
  },
  created() {
    store.dispatch("getRecipes").then(() => {
      this.shuffleDeck()
    })
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--black-font);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

#cardContainer {
  position: relative;
  height: 70vh;
}

#choiceButtons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 1;
}

.bottomMenu {
  background-color: var(--grey);
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.menuBtn {
  font-size: 26px;
  color: var(--white);
  border: none;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}

#btnCart {
  position: relative;
}

#btnCart p {
  position: absolute;
  top: -55%;
  right: -5%;
  font-size: 12px;
  line-height: 19px;
  text-align: center;
  vertical-align: center;
  color: var(--white);
  border-radius: 50%;
  background-color: var(--red);
  height: 19px;
  width: 19px;
}

#choiceButtons button {
  margin: 10px 40px;
  width: 70px;
  height: 43px;
  color: var(--white);
  font-weight: 700;
  background-color: var(--red);
  border: none;
  border-radius: 5px;
  font-size: 20px;
  box-shadow: 1px 4px 8px 1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.cards {
  transition: all 0.2s;
}

.cards-leave-active {
  transform: translateX(-100%);
}

.altCards-leave-active {
  transform: translate(0, 90vh) scale(0.05);
  opacity: 0.5;
}

.cards-enter,
.altCards-enter {
  opacity: 0;
}
</style>
