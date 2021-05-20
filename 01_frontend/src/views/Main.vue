<template>
  <div id="main">
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
import store from "@/store"
import RecipeCard from "@/components/RecipeCard.vue"
import BinarySearchTree from "@/lib/binarySearchTree"

export default Vue.extend({
  name: "Main",
  components: { RecipeCard },
  data() {
    return {
      recipeDeck: [],
      transitionName: "cards",
    }
  },
  computed: {
    bookmarks: () => {
      return store.state.bookmarks
    },
    cappedRecipeDeck: function () {
      return this.arrayHead(this.recipeDeck, 6)
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
  },
  created() {
    store.dispatch("getRecipes").then(() => {
      this.shuffleDeck()
    })
  },
})
</script>

<style scoped>
#main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

#cardContainer {
  height: 402px;
}

#choiceButtons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 1;
  margin-top: 10px;
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
  transform: translate(0, 80vh) scale(0.05);
  opacity: 0.5;
}

.cards-enter,
.altCards-enter {
  opacity: 0;
}
</style>
